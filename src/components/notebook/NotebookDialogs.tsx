"use client"

import {
  BookOpen, FileText, Volume2, Star, ChevronLeft, ChevronRight,
  Play, RotateCcw, Mic, Square, ArrowLeft,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { NotebookItem, CollectionType } from "@/hooks/notebook/types"
import { speakText } from "@/hooks/notebook/types"

// ─── Props ─────────────────────────────────────────

interface NotebookDialogsProps {
  // Review Modal
  isReviewModalOpen: boolean
  setIsReviewModalOpen: (open: boolean) => void
  currentItem: NotebookItem | undefined
  currentCardIndex: number
  flashcardItemsLength: number
  showAnswer: boolean
  setShowAnswer: (show: boolean) => void
  onReviewAnswer: (quality: number) => void

  // Session Complete
  sessionCompleteOpen: boolean
  setSessionCompleteOpen: (open: boolean) => void
  learnedCards: Set<string>
  notLearnedCards: Set<string>
  onResetSession: () => void
  onReviewUnmastered: () => void
  onGoToList: () => void

  // Shadowing
  shadowingOpen: boolean
  setShadowingOpen: (open: boolean) => void
  currentSentence: number
  setCurrentSentence: (index: number) => void
  isRecording: boolean
  setIsRecording: (recording: boolean) => void

  // New Notebook
  newCollectionOpen: boolean
  setNewCollectionOpen: (open: boolean) => void
  newCollectionName: string
  setNewCollectionName: (name: string) => void
  newCollectionType: CollectionType
  setNewCollectionType: (type: CollectionType) => void
  onAddCollection: () => void

  // Add Word
  addItemOpen: boolean
  setAddItemOpen: (open: boolean) => void
  newItem: { word: string; pronunciation: string; meaning: string; vietnamese: string; example: string; exampleVi: string; partOfSpeech: string; level: string; note: string; tags: string }
  setNewItem: (item: any) => void
  onAddItem: () => void

  // Add Grammar
  addGrammarOpen: boolean
  setAddGrammarOpen: (open: boolean) => void
  newGrammar: { title: string; rule: string; explanation: string; category: string; level: string; exampleEn: string; exampleVi: string }
  setNewGrammar: (grammar: any) => void
  onAddGrammar: () => void

  // Edit Word
  editItemOpen: boolean
  setEditItemOpen: (open: boolean) => void
  editingItem: NotebookItem | null
  setEditingItem: (item: NotebookItem | null) => void
  onEditItem: () => void

  // Delete Confirmations
  deleteConfirmOpen: boolean
  setDeleteConfirmOpen: (open: boolean) => void
  onDeleteItem: () => void
  deleteNotebookOpen: boolean
  setDeleteNotebookOpen: (open: boolean) => void
  onDeleteNotebook: () => void
}

export function NotebookDialogs(props: NotebookDialogsProps) {
  return (
    <>
      <ReviewModal {...props} />
      <SessionCompleteDialog {...props} />
      <ShadowingDialog {...props} />
      <NewNotebookDialog {...props} />
      <AddWordDialog {...props} />
      <AddGrammarDialog {...props} />
      <EditWordDialog {...props} />
      <DeleteItemDialog {...props} />
      <DeleteNotebookDialog {...props} />
    </>
  )
}

// ─── Review Modal ──────────────────────────────────

function ReviewModal({
  isReviewModalOpen, setIsReviewModalOpen,
  currentItem, currentCardIndex, flashcardItemsLength,
  showAnswer, setShowAnswer, onReviewAnswer,
}: NotebookDialogsProps) {
  return (
    <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle>Spaced Repetition Review</DialogTitle></DialogHeader>
        {currentItem && (
          <div className="space-y-6">
            <div className="text-center text-sm text-gray-500">Card {currentCardIndex + 1} of {flashcardItemsLength}</div>
            <Card className="p-6 bg-gray-50 border-2 border-gray-100">
              <h3 className="text-3xl font-bold mb-2 text-center">{currentItem.word}</h3>
              <p className="text-gray-500 text-center mb-4">{currentItem.pronunciation}</p>
              {showAnswer ? (
                <div className="space-y-4 mt-6">
                  <div className="bg-white p-4 rounded-lg"><p className="text-sm font-semibold mb-2">Meaning:</p>{currentItem.meaning.map((m, i) => <p key={i} className="text-sm">• {m}</p>)}</div>
                  <div className="bg-white p-4 rounded-lg"><p className="text-sm font-semibold mb-2">Vietnamese:</p>{currentItem.vietnamese.map((v, i) => <p key={i} className="text-sm">• {v}</p>)}</div>
                </div>
              ) : (
                <Button onClick={() => setShowAnswer(true)} variant="outline" className="w-full mt-4 bg-transparent">Show Answer</Button>
              )}
            </Card>
            {showAnswer && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-center">How well did you remember?</p>
                <div className="grid grid-cols-5 gap-2">
                  <Button variant="outline" onClick={() => onReviewAnswer(0)} className="bg-red-50 hover:bg-red-100 border-red-200 text-xs">Again</Button>
                  <Button variant="outline" onClick={() => onReviewAnswer(1)} className="bg-orange-50 hover:bg-orange-100 border-orange-200 text-xs">Hard</Button>
                  <Button variant="outline" onClick={() => onReviewAnswer(2)} className="bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-xs">Good</Button>
                  <Button variant="outline" onClick={() => onReviewAnswer(3)} className="bg-lime-50 hover:bg-lime-100 border-lime-200 text-xs">Easy</Button>
                  <Button variant="outline" onClick={() => onReviewAnswer(4)} className="bg-green-50 hover:bg-green-100 border-green-200 text-xs">Perfect</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ─── Session Complete ──────────────────────────────

function SessionCompleteDialog({
  sessionCompleteOpen, setSessionCompleteOpen,
  learnedCards, notLearnedCards,
  onResetSession, onReviewUnmastered, onGoToList,
}: NotebookDialogsProps) {
  return (
    <Dialog open={sessionCompleteOpen} onOpenChange={setSessionCompleteOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader><DialogTitle className="text-2xl font-bold text-center">Session Complete! 🎉</DialogTitle></DialogHeader>
        <div className="space-y-6 py-6">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-48 h-48">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="#fde68a" strokeWidth="32" fill="none" />
                <circle cx="96" cy="96" r="80" stroke="#86efac" strokeWidth="32" fill="none" strokeDasharray={`${(learnedCards.size / Math.max(learnedCards.size + notLearnedCards.size, 1)) * 502.4} 502.4`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-bold text-gray-900">{learnedCards.size + notLearnedCards.size > 0 ? Math.round((learnedCards.size / (learnedCards.size + notLearnedCards.size)) * 100) : 0}%</p>
                <p className="text-sm text-gray-500">Mastered</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-yellow-300" /><div><p className="text-sm font-medium">Learning</p><p className="text-xs text-gray-500">{notLearnedCards.size} cards</p></div></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-green-300" /><div><p className="text-sm font-medium">Mastered</p><p className="text-xs text-gray-500">{learnedCards.size} cards</p></div></div>
            </div>
          </div>
          <div className="space-y-3">
            <Button className="w-full gap-2 h-12 rounded-xl" disabled={notLearnedCards.size === 0} onClick={onReviewUnmastered}><Play className="h-5 w-5" /> Review Unmastered ({notLearnedCards.size})</Button>
            <Button className="w-full gap-2 h-12 rounded-xl bg-transparent" variant="outline" onClick={onResetSession}><RotateCcw className="h-5 w-5" /> Start Over</Button>
            <Button className="w-full gap-2 h-12 rounded-xl bg-transparent" variant="outline" onClick={onGoToList}><ArrowLeft className="h-5 w-5" /> Back to List</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Shadowing ─────────────────────────────────────

function ShadowingDialog({
  shadowingOpen, setShadowingOpen,
  currentItem, currentSentence, setCurrentSentence,
  isRecording, setIsRecording,
}: NotebookDialogsProps) {
  return (
    <Dialog open={shadowingOpen} onOpenChange={setShadowingOpen}>
      <DialogContent className="max-w-3xl bg-white">
        <DialogHeader><DialogTitle className="text-2xl font-bold text-center mb-6">Shadowing Practice</DialogTitle></DialogHeader>
        {currentItem && currentItem.examples.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button size="icon" variant="outline" onClick={() => setCurrentSentence(Math.max(0, currentSentence - 1))} disabled={currentSentence === 0} className="rounded-full h-10 w-10"><ChevronLeft className="h-5 w-5" /></Button>
              <span className="text-sm font-medium">Sentence {currentSentence + 1} / {currentItem.examples.length}</span>
              <Button size="icon" variant="outline" onClick={() => setCurrentSentence(Math.min(currentItem.examples.length - 1, currentSentence + 1))} disabled={currentSentence === currentItem.examples.length - 1} className="rounded-full h-10 w-10"><ChevronRight className="h-5 w-5" /></Button>
            </div>
            <Card className="p-6 bg-primary-50 border-2 border-border">
              <p className="text-xl mb-4 text-gray-900">{currentItem.examples[currentSentence]?.en}</p>
              <p className="text-base text-gray-500">{currentItem.examples[currentSentence]?.vi}</p>
            </Card>
            <div className="flex flex-col items-center gap-4">
              <Button size="lg" variant={isRecording ? "destructive" : "default"} onClick={() => setIsRecording(!isRecording)} className="h-24 w-24 rounded-full">
                {isRecording ? <Square className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
              </Button>
              <p className="text-sm text-gray-500">{isRecording ? "Recording... Click to stop" : "Click to start recording"}</p>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" className="gap-2 bg-transparent" onClick={() => speakText(currentItem.examples[currentSentence]?.en || "")}><Volume2 className="h-4 w-4" /> Play Original</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ─── New Notebook ──────────────────────────────────

function NewNotebookDialog({
  newCollectionOpen, setNewCollectionOpen,
  newCollectionName, setNewCollectionName,
  newCollectionType, setNewCollectionType,
  onAddCollection,
}: NotebookDialogsProps) {
  return (
    <Dialog open={newCollectionOpen} onOpenChange={setNewCollectionOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Create New Notebook</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Notebook Type</Label>
            <RadioGroup value={newCollectionType} onValueChange={(v) => setNewCollectionType(v as CollectionType)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vocabulary" id="vocab" />
                <Label htmlFor="vocab" className="flex items-center gap-2 cursor-pointer"><BookOpen className="h-4 w-4" /> Vocabulary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="grammar" id="grammar" />
                <Label htmlFor="grammar" className="flex items-center gap-2 cursor-pointer"><FileText className="h-4 w-4" /> Grammar</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="collection-name">Notebook Name</Label>
            <Input id="collection-name" placeholder={newCollectionType === "vocabulary" ? "e.g., IELTS Vocabulary" : "e.g., Advanced Tenses"} value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)} className="h-11 rounded-xl border-2" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setNewCollectionOpen(false)} className="bg-transparent">Cancel</Button>
          <Button onClick={onAddCollection} disabled={!newCollectionName.trim()}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Add Word ──────────────────────────────────────

function AddWordDialog({
  addItemOpen, setAddItemOpen,
  newItem, setNewItem, onAddItem,
}: NotebookDialogsProps) {
  return (
    <Dialog open={addItemOpen} onOpenChange={setAddItemOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Add New Word</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Word *</Label><Input placeholder="e.g., Accomplish" value={newItem.word} onChange={(e) => setNewItem({ ...newItem, word: e.target.value })} className="h-11 rounded-xl border-2" /></div>
            <div className="space-y-2"><Label>Pronunciation</Label><Input placeholder="e.g., /əˈkʌmplɪʃ/" value={newItem.pronunciation} onChange={(e) => setNewItem({ ...newItem, pronunciation: e.target.value })} className="h-11 rounded-xl border-2" /></div>
          </div>
          <div className="space-y-2"><Label>Meaning (English) - one per line</Label><Textarea placeholder="To complete something successfully" value={newItem.meaning} onChange={(e) => setNewItem({ ...newItem, meaning: e.target.value })} className="min-h-[80px] rounded-xl border-2" /></div>
          <div className="space-y-2"><Label>Vietnamese - one per line</Label><Textarea placeholder="Hoàn thành, đạt được" value={newItem.vietnamese} onChange={(e) => setNewItem({ ...newItem, vietnamese: e.target.value })} className="min-h-[80px] rounded-xl border-2" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Example (English)</Label><Input placeholder="She accomplished her goals." value={newItem.example} onChange={(e) => setNewItem({ ...newItem, example: e.target.value })} className="h-11 rounded-xl border-2" /></div>
            <div className="space-y-2"><Label>Example (Vietnamese)</Label><Input placeholder="Cô ấy đã hoàn thành mục tiêu." value={newItem.exampleVi} onChange={(e) => setNewItem({ ...newItem, exampleVi: e.target.value })} className="h-11 rounded-xl border-2" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Part of Speech</Label>
              <Select value={newItem.partOfSpeech} onValueChange={(v) => setNewItem({ ...newItem, partOfSpeech: v })}>
                <SelectTrigger className="h-11 rounded-xl border-2"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="noun">Noun</SelectItem><SelectItem value="verb">Verb</SelectItem><SelectItem value="adjective">Adjective</SelectItem><SelectItem value="adverb">Adverb</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Level</Label>
              <Select value={newItem.level} onValueChange={(v) => setNewItem({ ...newItem, level: v })}>
                <SelectTrigger className="h-11 rounded-xl border-2"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="A1">A1</SelectItem><SelectItem value="A2">A2</SelectItem><SelectItem value="B1">B1</SelectItem><SelectItem value="B2">B2</SelectItem><SelectItem value="C1">C1</SelectItem><SelectItem value="C2">C2</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2"><Label>Tags (comma separated)</Label><Input placeholder="business, formal" value={newItem.tags} onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })} className="h-11 rounded-xl border-2" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setAddItemOpen(false)} className="bg-transparent">Cancel</Button>
          <Button onClick={onAddItem} disabled={!newItem.word.trim()}>Add Word</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Add Grammar ───────────────────────────────────

function AddGrammarDialog({
  addGrammarOpen, setAddGrammarOpen,
  newGrammar, setNewGrammar, onAddGrammar,
}: NotebookDialogsProps) {
  return (
    <Dialog open={addGrammarOpen} onOpenChange={setAddGrammarOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Add Grammar Rule</DialogTitle></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Title *</Label><Input placeholder="e.g., Present Perfect Tense" value={newGrammar.title} onChange={(e) => setNewGrammar({ ...newGrammar, title: e.target.value })} className="h-11 rounded-xl border-2" /></div>
            <div className="space-y-2"><Label>Category</Label>
              <Select value={newGrammar.category} onValueChange={(v) => setNewGrammar({ ...newGrammar, category: v })}>
                <SelectTrigger className="h-11 rounded-xl border-2"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Tenses">Tenses</SelectItem><SelectItem value="Conditionals">Conditionals</SelectItem><SelectItem value="Voice">Voice</SelectItem><SelectItem value="Clauses">Clauses</SelectItem><SelectItem value="Speech">Speech</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2"><Label>Rule Formula *</Label><Input placeholder="e.g., Subject + have/has + past participle" value={newGrammar.rule} onChange={(e) => setNewGrammar({ ...newGrammar, rule: e.target.value })} className="h-11 rounded-xl border-2" /></div>
          <div className="space-y-2"><Label>Explanation</Label><Textarea placeholder="Explain when and how to use this grammar rule..." value={newGrammar.explanation} onChange={(e) => setNewGrammar({ ...newGrammar, explanation: e.target.value })} className="min-h-[100px] rounded-xl border-2" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Example (English)</Label><Input placeholder="I have visited Paris." value={newGrammar.exampleEn} onChange={(e) => setNewGrammar({ ...newGrammar, exampleEn: e.target.value })} className="h-11 rounded-xl border-2" /></div>
            <div className="space-y-2"><Label>Example (Vietnamese)</Label><Input placeholder="Tôi đã đến Paris." value={newGrammar.exampleVi} onChange={(e) => setNewGrammar({ ...newGrammar, exampleVi: e.target.value })} className="h-11 rounded-xl border-2" /></div>
          </div>
          <div className="space-y-2"><Label>Level</Label>
            <Select value={newGrammar.level} onValueChange={(v) => setNewGrammar({ ...newGrammar, level: v })}>
              <SelectTrigger className="h-11 rounded-xl border-2"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="A1">A1</SelectItem><SelectItem value="A2">A2</SelectItem><SelectItem value="B1">B1</SelectItem><SelectItem value="B2">B2</SelectItem><SelectItem value="C1">C1</SelectItem><SelectItem value="C2">C2</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setAddGrammarOpen(false)} className="bg-transparent">Cancel</Button>
          <Button onClick={onAddGrammar} disabled={!newGrammar.title.trim() || !newGrammar.rule.trim()}>Add Rule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Edit Word ─────────────────────────────────────

function EditWordDialog({
  editItemOpen, setEditItemOpen,
  editingItem, setEditingItem, onEditItem,
}: NotebookDialogsProps) {
  return (
    <Dialog open={editItemOpen} onOpenChange={setEditItemOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Edit Word</DialogTitle></DialogHeader>
        {editingItem && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Word</Label><Input value={editingItem.word} onChange={(e) => setEditingItem({ ...editingItem, word: e.target.value })} className="h-11 rounded-xl border-2" /></div>
              <div className="space-y-2"><Label>Pronunciation</Label><Input value={editingItem.pronunciation} onChange={(e) => setEditingItem({ ...editingItem, pronunciation: e.target.value })} className="h-11 rounded-xl border-2" /></div>
            </div>
            <div className="space-y-2"><Label>Meaning</Label><Textarea value={editingItem.meaning.join("\n")} onChange={(e) => setEditingItem({ ...editingItem, meaning: e.target.value.split("\n").filter(Boolean) })} className="min-h-[80px] rounded-xl border-2" /></div>
            <div className="space-y-2"><Label>Vietnamese</Label><Textarea value={editingItem.vietnamese.join("\n")} onChange={(e) => setEditingItem({ ...editingItem, vietnamese: e.target.value.split("\n").filter(Boolean) })} className="min-h-[80px] rounded-xl border-2" /></div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => setEditItemOpen(false)} className="bg-transparent">Cancel</Button>
          <Button onClick={onEditItem}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Delete Confirmations ──────────────────────────

function DeleteItemDialog({
  deleteConfirmOpen, setDeleteConfirmOpen, onDeleteItem,
}: NotebookDialogsProps) {
  return (
    <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Delete Item</DialogTitle></DialogHeader>
        <p className="text-gray-600 py-4">Are you sure you want to delete this item? This action cannot be undone.</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)} className="bg-transparent">Cancel</Button>
          <Button variant="destructive" onClick={onDeleteItem}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DeleteNotebookDialog({
  deleteNotebookOpen, setDeleteNotebookOpen, onDeleteNotebook,
}: NotebookDialogsProps) {
  return (
    <Dialog open={deleteNotebookOpen} onOpenChange={setDeleteNotebookOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Delete Notebook</DialogTitle></DialogHeader>
        <p className="text-gray-600 py-4">
          Are you sure you want to delete this notebook? All items inside will also be deleted. This action cannot be undone.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteNotebookOpen(false)} className="bg-transparent">Cancel</Button>
          <Button variant="destructive" onClick={onDeleteNotebook}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
