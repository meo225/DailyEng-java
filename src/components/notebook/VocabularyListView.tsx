"use client"

import { BookOpen, Volume2, Star, Edit, Trash2, Search, Filter, Plus, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { NotebookItem } from "@/hooks/notebook/types"
import { MASTERY_LEVELS, getMasteryConfig, speakText } from "@/hooks/notebook/types"

interface VocabularyListViewProps {
  filteredVocabItems: NotebookItem[]
  selectedItems: Set<string>
  setSelectedItems: (items: Set<string>) => void
  starredItems: Set<string>
  setStarredItems: React.Dispatch<React.SetStateAction<Set<string>>>
  searchQuery: string
  setSearchQuery: (query: string) => void
  masteryFilter: string[]
  setMasteryFilter: (filter: string[]) => void
  starredFilter: boolean | null
  setStarredFilter: (filter: boolean | null) => void
  levelFilter: string[]
  setLevelFilter: (filter: string[]) => void
  onEdit: (item: NotebookItem) => void
  onDelete: (id: string) => void
  onAddItem: () => void
}

export function VocabularyListView({
  filteredVocabItems, selectedItems, setSelectedItems,
  starredItems, setStarredItems,
  searchQuery, setSearchQuery,
  masteryFilter, setMasteryFilter,
  starredFilter, setStarredFilter,
  levelFilter, setLevelFilter,
  onEdit, onDelete, onAddItem,
}: VocabularyListViewProps) {
  return (
    <Card className="p-6 rounded-2xl border-2 border-primary-100 bg-white">
      <div className="flex items-center justify-between gap-4 mb-4">
        {/* Left: Select All */}
        <div className="flex items-center gap-2">
          <Checkbox id="select-all" checked={selectedItems.size === filteredVocabItems.length && filteredVocabItems.length > 0}
            onCheckedChange={(checked) => setSelectedItems(checked ? new Set(filteredVocabItems.map(i => i.id)) : new Set())} className="h-5 w-5 border-2" />
          <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">Select All</label>
          {selectedItems.size > 0 && <Badge className="bg-primary-100 text-primary-700">{selectedItems.size}</Badge>}
        </div>

        {/* Right: Search + Filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 h-9 w-48 text-sm rounded-full border-2 border-primary-200 hover:border-primary-300 focus:border-primary-400 transition-all"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Filter vocabulary" className="h-9 w-9 relative rounded-full hover:bg-primary-50 cursor-pointer">
                <Filter className="h-4 w-4 text-primary-500" />
                {(masteryFilter.length > 0 || starredFilter !== null || levelFilter.length > 0) && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center">!</span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-xs text-gray-500">Progress</DropdownMenuLabel>
              {MASTERY_LEVELS.map((level) => (
                <DropdownMenuCheckboxItem key={level.value} checked={masteryFilter.includes(level.value)}
                  onCheckedChange={(c) => setMasteryFilter(c ? [...masteryFilter, level.value] : masteryFilter.filter(m => m !== level.value))}>
                  <div className={`h-3 w-3 rounded-full ${level.color} mr-2`} />{level.label}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-gray-500">Level</DropdownMenuLabel>
              {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
                <DropdownMenuCheckboxItem key={level} checked={levelFilter.includes(level)}
                  onCheckedChange={(c) => setLevelFilter(c ? [...levelFilter, level] : levelFilter.filter(l => l !== level))}>{level}</DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={starredFilter === true} onCheckedChange={(c) => setStarredFilter(c ? true : null)}>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-2" /> Starred
              </DropdownMenuCheckboxItem>
              {(masteryFilter.length > 0 || starredFilter !== null || levelFilter.length > 0) && (
                <><DropdownMenuSeparator /><Button variant="ghost" size="sm" onClick={() => { setMasteryFilter([]); setStarredFilter(null); setLevelFilter([]) }} className="w-full text-gray-500"><X className="h-4 w-4 mr-2" /> Clear</Button></>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b-2 border-gray-100">
            <TableHead className="w-12"></TableHead>
            <TableHead>Word</TableHead>
            <TableHead>Meaning</TableHead>
            <TableHead className="w-16 text-center">Level</TableHead>
            <TableHead className="w-24 text-center">Progress</TableHead>
            <TableHead className="w-24"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVocabItems.map((item) => (
            <TableRow key={item.id} className="hover:bg-gray-50 group">
              <TableCell><Checkbox checked={selectedItems.has(item.id)} onCheckedChange={(c) => { const s = new Set(selectedItems); c ? s.add(item.id) : s.delete(item.id); setSelectedItems(s) }} /></TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div><p className="font-semibold">{item.word}</p><p className="text-xs text-gray-500">{item.pronunciation}</p></div>
                  <Button variant="ghost" size="icon" aria-label="Listen to pronunciation" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={() => speakText(item.word)}><Volume2 className="h-3.5 w-3.5" /></Button>
                </div>
              </TableCell>
              <TableCell><div className="space-y-0.5">{item.vietnamese.slice(0, 2).map((v, i) => <p key={i} className="text-sm text-gray-700 line-clamp-1">{i + 1}. {v}</p>)}</div></TableCell>
              <TableCell className="text-center"><Badge className="bg-gray-100 text-gray-600 border-0">{item.level}</Badge></TableCell>
              <TableCell className="text-center"><div className={`inline-block px-3 py-1 rounded text-xs font-medium ${getMasteryConfig(item.masteryLevel).bgLight} ${getMasteryConfig(item.masteryLevel).textColor}`}>{item.masteryLevel}%</div></TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" aria-label="Toggle star" className="h-8 w-8 rounded-full hover:bg-yellow-50" onClick={() => setStarredItems(p => { const s = new Set(p); s.has(item.id) ? s.delete(item.id) : s.add(item.id); return s })}>
                    <Star className={`h-4 w-4 ${starredItems.has(item.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Edit word" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100" onClick={() => onEdit(item)}><Edit className="h-4 w-4 text-gray-400" /></Button>
                  <Button variant="ghost" size="icon" aria-label="Delete word" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-50" onClick={() => onDelete(item.id)}><Trash2 className="h-4 w-4 text-gray-400" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredVocabItems.length === 0 && <div className="text-center py-12"><BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" /><p className="text-gray-500">No words found. Add some words to get started!</p></div>}

      {/* Add Word Button */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Button onClick={onAddItem} variant="outline" className="w-full gap-2 h-11 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary-300 hover:bg-primary-50 bg-transparent cursor-pointer transition-all">
          <Plus className="h-4 w-4" /> Add Word
        </Button>
      </div>
    </Card>
  )
}
