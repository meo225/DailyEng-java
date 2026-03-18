"use client"

import { FileText, Volume2, Trash2, Search, Filter, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem,
  DropdownMenuLabel, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { GrammarItem } from "@/hooks/notebook/types"
import { getMasteryConfig, speakText } from "@/hooks/notebook/types"

interface GrammarListViewProps {
  filteredGrammarItems: GrammarItem[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  levelFilter: string[]
  setLevelFilter: (filter: string[]) => void
  onDelete: (id: string) => void
  onAddGrammar: () => void
}

export function GrammarListView({
  filteredGrammarItems, searchQuery, setSearchQuery,
  levelFilter, setLevelFilter, onDelete, onAddGrammar,
}: GrammarListViewProps) {
  return (
    <Card className="p-6 rounded-2xl border-2 border-primary-100 bg-white">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-400" />
          <Input placeholder="Search grammar rules..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-3 h-9 text-sm rounded-full border-2 border-primary-200 hover:border-primary-300 focus:border-primary-400 transition-all" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-primary-50 cursor-pointer">
              <Filter className="h-4 w-4 text-primary-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-xs text-gray-500">Level</DropdownMenuLabel>
            {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
              <DropdownMenuCheckboxItem key={level} checked={levelFilter.includes(level)}
                onCheckedChange={(c) => setLevelFilter(c ? [...levelFilter, level] : levelFilter.filter(l => l !== level))}>{level}</DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        {filteredGrammarItems.map((item) => (
          <div key={item.id} className="p-5 rounded-xl border-2 border-gray-100 hover:border-primary-200 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary-100 text-primary-700">{item.category}</Badge>
                  <Badge className="bg-gray-100 text-gray-600">{item.level}</Badge>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded text-xs font-medium ${getMasteryConfig(item.masteryLevel).bgLight} ${getMasteryConfig(item.masteryLevel).textColor}`}>{item.masteryLevel}%</div>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:bg-red-50" onClick={() => onDelete(item.id)}><Trash2 className="h-4 w-4 text-gray-400" /></Button>
              </div>
            </div>

            <div className="bg-primary-50 rounded-lg p-3 mb-3">
              <p className="text-sm font-mono font-semibold text-primary-700">{item.rule}</p>
            </div>

            <p className="text-sm text-gray-600 mb-3">{item.explanation}</p>

            {item.examples.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-gray-700">Examples:</h4>
                {item.examples.map((ex, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-2.5 space-y-0.5">
                    <p className="text-sm text-gray-800 flex items-center gap-2">
                      <span className="text-primary-600">→</span> {ex.en}
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => speakText(ex.en)}><Volume2 className="h-3 w-3" /></Button>
                    </p>
                    <p className="text-sm text-gray-500 pl-5">{ex.vi}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredGrammarItems.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No grammar rules found. Add some rules to get started!</p>
        </div>
      )}

      {/* Add Rule Button */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Button onClick={onAddGrammar} variant="outline" className="w-full gap-2 h-11 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary-300 hover:bg-primary-50 bg-transparent cursor-pointer transition-all">
          <Plus className="h-4 w-4" /> Add Rule
        </Button>
      </div>
    </Card>
  )
}
