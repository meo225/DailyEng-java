"use client"

import { Clock, Target, TrendingUp, Plus, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { CollectionWithIcon, CollectionType } from "@/hooks/notebook/types"

interface NotebookSidebarProps {
  collections: CollectionWithIcon[]
  filteredCollections: CollectionWithIcon[]
  selectedCollection: string
  collectionTypeFilter: CollectionType
  dueCount: number
  stats: { total: number; avgMastery: number }
  onCollectionTypeChange: (type: CollectionType) => void
  onSelectCollection: (id: string) => void
  onNewNotebook: () => void
  onDeleteNotebook: (id: string) => void
}

export function NotebookSidebar({
  collections, filteredCollections, selectedCollection,
  collectionTypeFilter, dueCount, stats,
  onCollectionTypeChange, onSelectCollection, onNewNotebook, onDeleteNotebook,
}: NotebookSidebarProps) {
  return (
    <aside className="w-72 flex-shrink-0">
      <Card className="p-5 sticky top-20 rounded-2xl border-2 border-primary-100 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Notebooks</h2>
          <Badge variant="secondary" className="text-xs">{collections.length}</Badge>
        </div>

        {/* Notebook Type Filter */}
        <div className="flex gap-1 mb-4 p-1 bg-gray-100 rounded-lg">
          {(["vocabulary", "grammar"] as const).map(type => (
            <button key={type} onClick={() => onCollectionTypeChange(type)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${collectionTypeFilter === type ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}>
              {type === "vocabulary" ? "Vocabulary" : "Grammar"}
            </button>
          ))}
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {filteredCollections.map((collection) => (
            <div key={collection.id} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all group ${selectedCollection === collection.id ? "bg-primary-100 border-2 border-primary-300 shadow-sm" : "hover:bg-gray-50 border-2 border-transparent"}`}>
              <button
                onClick={() => onSelectCollection(collection.id)}
                className="flex items-center gap-3 flex-1"
              >
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${selectedCollection === collection.id ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                  {collection.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <p className={`font-semibold ${selectedCollection === collection.id ? "text-primary-700" : "text-gray-900"}`}>{collection.name}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500">{collection.count} items</span>
                    <span className="text-xs text-success-300">{collection.mastered} mastered</span>
                  </div>
                </div>
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-opacity"
                onClick={(e) => { e.stopPropagation(); onDeleteNotebook(collection.id) }}
              >
                <Trash2 className="h-3.5 w-3.5 text-gray-400 hover:text-red-500" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-gray-100">
          <Button variant="outline" onClick={onNewNotebook}
            className="w-full gap-2 justify-center h-11 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary-300 hover:bg-primary-50 bg-transparent cursor-pointer transition-all">
            <Plus className="h-4 w-4" /> New Notebook
          </Button>
        </div>

        <div className="mt-5 pt-5 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-gray-400" /><span className="text-sm text-gray-600">Due today</span></div>
              <span className="text-sm font-medium text-primary-600">{dueCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Target className="h-4 w-4 text-gray-400" /><span className="text-sm text-gray-600">Mastery</span></div>
              <span className="text-sm font-medium text-success-300">{stats.avgMastery}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-gray-400" /><span className="text-sm text-gray-600">Total items</span></div>
              <span className="text-sm font-medium text-gray-900">{stats.total}</span>
            </div>
          </div>
        </div>
      </Card>
    </aside>
  )
}
