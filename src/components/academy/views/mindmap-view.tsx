"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useAcademy } from "@/lib/academy-store";
import { offlineStore } from "@/lib/offline-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Brain,
  ZoomIn,
  ZoomOut,
  Maximize,
  Info,
} from "lucide-react";

interface MindMapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  parent?: string;
}
interface MindMapEdge {
  from: string;
  to: string;
  label?: string;
}

export function MindMapView() {
  const { curriculumId, grade, subjectId, mindMapId, setView } = useAcademy();
  const [mindMap, setMindMap] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  useEffect(() => {
    if (!mindMapId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    (async () => {
      if (curriculumId && grade && subjectId) {
        const bundle = await offlineStore.getBundle(curriculumId, grade);
        if (bundle) {
          const subj = bundle.subjects.find((s: any) => s.subject.id === subjectId);
          const m = subj?.mindMaps.find((mm: any) => mm.id === mindMapId);
          if (m) {
            setMindMap(m);
            setLoading(false);
            return;
          }
        }
      }
      try {
        const r = await fetch(`/api/academy/mindmap?subjectId=${subjectId}&grade=${grade}`);
        const d = await r.json();
        const m = (d.mindMaps || []).find((mm: any) => mm.id === mindMapId);
        if (m) setMindMap(m);
      } catch {}
      setLoading(false);
    })();
  }, [mindMapId, curriculumId, grade, subjectId]);

  const nodes: MindMapNode[] = useMemo(
    () => (mindMap?.nodes ?? []) as MindMapNode[],
    [mindMap]
  );
  const edges: MindMapEdge[] = useMemo(
    () => (mindMap?.edges ?? []) as MindMapEdge[],
    [mindMap]
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="animate-pulse h-6 w-1/2 bg-muted rounded mb-4" />
        <div className="animate-pulse h-96 bg-muted rounded" />
      </div>
    );
  }

  if (!mindMap) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">Mind map not found.</p>
          <Button onClick={() => setView("mindmaps")}>Back to mind maps</Button>
        </Card>
      </div>
    );
  }

  // Compute SVG viewBox from node positions
  const xs = nodes.map((n) => n.x);
  const ys = nodes.map((n) => n.y);
  const minX = Math.min(...xs) - 100;
  const maxX = Math.max(...xs) + 100;
  const minY = Math.min(...ys) - 80;
  const maxY = Math.max(...ys) + 80;
  const width = maxX - minX;
  const height = maxY - minY;

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    setZoom((z) => Math.max(0.5, Math.min(3, z - e.deltaY * 0.001)));
  }

  function onMouseDown(e: React.MouseEvent) {
    dragRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!dragRef.current) return;
    setPan({
      x: dragRef.current.px + (e.clientX - dragRef.current.x),
      y: dragRef.current.py + (e.clientY - dragRef.current.y),
    });
  }

  function onMouseUp() {
    dragRef.current = null;
  }

  function resetView() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  const selectedNode = nodes.find((n) => n.id === selected);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <button
        onClick={() => setView("mindmaps")}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3"
      >
        <ChevronLeft size={14} /> Back to mind maps
      </button>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
            <Brain size={16} />
          </div>
          <h1 className="text-xl font-bold">{mindMap.title}</h1>
        </div>
        <p className="text-sm text-muted-foreground">{mindMap.description}</p>
      </div>

      <Card className="p-0 overflow-hidden relative">
        {/* Toolbar */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-background/90 backdrop-blur rounded-md border border-border p-1">
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setZoom((z) => Math.min(3, z + 0.2))}>
            <ZoomIn size={14} />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}>
            <ZoomOut size={14} />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={resetView}>
            <Maximize size={14} />
          </Button>
          <Badge variant="outline" className="text-xs ml-1">{Math.round(zoom * 100)}%</Badge>
        </div>

        <div
          className="w-full h-[480px] sm:h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 cursor-grab active:cursor-grabbing"
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <svg
            ref={svgRef}
            viewBox={`${minX} ${minY} ${width} ${height}`}
            className="w-full h-full"
            style={{ transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`, transformOrigin: "center" }}
          >
            {/* Edges */}
            {edges.map((e, i) => {
              const from = nodes.find((n) => n.id === e.from);
              const to = nodes.find((n) => n.id === e.to);
              if (!from || !to) return null;
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2;
              const isHighlighted =
                hovered === e.from || hovered === e.to || selected === e.from || selected === e.to;
              return (
                <g key={i}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isHighlighted ? "#0d9488" : "#94a3b8"}
                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                    strokeOpacity={isHighlighted ? 1 : 0.6}
                  />
                  {e.label && (
                    <text
                      x={midX}
                      y={midY - 4}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#64748b"
                      className="select-none pointer-events-none"
                    >
                      {e.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((n) => {
              const isCenter = n.id === "c";
              const isHovered = hovered === n.id;
              const isSelected = selected === n.id;
              const isLeaf = !edges.some((e) => e.from === n.id);
              const r = isCenter ? 56 : isLeaf ? 36 : 46;
              const fontSize = isCenter ? 14 : isLeaf ? 11 : 12;
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x}, ${n.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(isSelected ? null : n.id)}
                >
                  <ellipse
                    rx={r}
                    ry={r * 0.7}
                    fill={n.color}
                    fillOpacity={isCenter ? 1 : isSelected ? 0.95 : 0.85}
                    stroke={isSelected ? "#0d9488" : isHovered ? "#0d9488" : "white"}
                    strokeWidth={isSelected ? 3 : isHovered ? 2 : 1.5}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={fontSize}
                    fontWeight={isCenter ? 700 : 500}
                    fill="white"
                    className="select-none pointer-events-none"
                  >
                    {wrapLabel(n.label, isCenter ? 14 : isLeaf ? 10 : 11).map((line, i, arr) => (
                      <tspan
                        key={i}
                        x={0}
                        dy={i === 0 ? -(arr.length - 1) * 6 : 14}
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </Card>

      {/* Info panel */}
      <Card className="mt-4 p-4 bg-muted/30">
        <div className="flex items-start gap-2">
          <Info size={16} className="text-muted-foreground mt-0.5 shrink-0" />
          <div className="text-sm text-foreground/90">
            {selectedNode ? (
              <>
                <span className="font-semibold">{selectedNode.label}</span>{" "}
                <span className="text-muted-foreground">
                  · {edges.filter((e) => e.from === selectedNode.id || e.to === selectedNode.id).length} connections
                </span>
                <div className="text-xs text-muted-foreground mt-1">
                  Click another node to explore. Drag to pan, scroll to zoom. Use this
                  map for quick revision before quizzes and exams.
                </div>
              </>
            ) : (
              <>
                <span className="font-medium">How to use:</span> Click any node to
                highlight its connections. Drag the canvas to pan, scroll to zoom.
                Mind maps are designed for quick recall — try to redraw this map from
                memory as a self-test!
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

function wrapLabel(label: string, maxChars: number): string[] {
  if (label.length <= maxChars) return [label];
  const words = label.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > maxChars) {
      if (current) lines.push(current);
      current = w;
    } else {
      current = (current + " " + w).trim();
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3); // max 3 lines
}
