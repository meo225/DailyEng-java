"use client"

import {
  BookOpen, FileText, Volume2, Star, ChevronLeft, ChevronRight,
  Play, RotateCcw, Mic, Square, ArrowLeft, Trophy,
} from "lucide-react"
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
import { VocabDictionarySearch, GrammarDictionarySearch } from "@/components/notebook/DictionarySearch"
import type { DictionaryWordResult, DictionaryGrammarResult } from "@/actions/notebook"

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
      <DialogContent className="max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="notebook-heading text-xl">Spaced Repetition Review</DialogTitle>
        </DialogHeader>
        {currentItem && (
          <div className="space-y-6">
            <div className="text-center text-sm text-gray-400 font-semibold">Card {currentCardIndex + 1} of {flashcardItemsLength}</div>
            <div className="p-6 bg-primary-50/40 rounded-xl border border-primary-100/60">
              <h3 className="gradient-text notebook-heading text-3xl font-extrabold mb-2 text-center">{currentItem.word}</h3>
              <p className="text-gray-400 text-center mb-4 font-mono">{currentItem.pronunciation}</p>
              {showAnswer ? (
                <div className="space-y-4 mt-6">
                  <div className="bg-white/80 p-4 rounded-xl border border-primary-100/40">
                    <p className="text-sm font-bold text-gray-600 mb-2">Meaning:</p>
                    {currentItem.meaning.map((m, i) => <p key={i} className="text-sm text-gray-700">• {m}</p>)}
                  </div>
                  <div className="bg-white/80 p-4 rounded-xl border border-primary-100/40">
                    <p className="text-sm font-bold text-gray-600 mb-2">Vietnamese:</p>
                    {currentItem.vietnamese.map((v, i) => <p key={i} className="text-sm text-gray-700">• {v}</p>)}
                  </div>
                </div>
              ) : (
                <Button onClick={() => setShowAnswer(true)} variant="outline"
                  className="w-full mt-4 bg-white/80 rounded-xl border-primary-200 hover:bg-primary-50 text-primary-600 font-semibold cursor-pointer">
                  Show Answer
                </Button>
              )}
            </div>
            {showAnswer && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-500 text-center">How well did you remember?</p>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { q: 0, label: "Again", bg: "bg-red-50 hover:bg-red-100 border-red-200 text-red-600" },
                    { q: 1, label: "Hard", bg: "bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-600" },
                    { q: 2, label: "Good", bg: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-600" },
                    { q: 3, label: "Easy", bg: "bg-lime-50 hover:bg-lime-100 border-lime-200 text-lime-600" },
                    { q: 4, label: "Perfect", bg: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-600" },
                  ].map((btn) => (
                    <Button key={btn.q} variant="outline" onClick={() => onReviewAnswer(btn.q)}
                      className={`${btn.bg} text-xs font-semibold rounded-xl cursor-pointer transition-all`}>
                      {btn.label}
                    </Button>
                  ))}
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
  const total = learnedCards.size + notLearnedCards.size
  const percentage = total > 0 ? Math.round((learnedCards.size / total) * 100) : 0

  return (
    <Dialog open={sessionCompleteOpen} onOpenChange={setSessionCompleteOpen}>
      <DialogContent className="max-w-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="notebook-heading text-2xl font-extrabold text-center flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6 text-amber-500" /> Session Complete!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-48 h-48">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="#f1f5f9" strokeWidth="32" fill="none" />
                <circle cx="96" cy="96" r="80" stroke="#10b981" strokeWidth="32" fill="none"
                  strokeDasharray={`${(learnedCards.size / Math.max(total, 1)) * 502.4} 502.4`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="notebook-heading text-4xl font-extrabold text-gray-900">{percentage}%</p>
                <p className="text-sm text-gray-400 font-semibold">Mastered</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-amber-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Learning</p>
                  <p className="text-xs text-gray-400">{notLearnedCards.size} cards</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Mastered</p>
                  <p className="text-xs text-gray-400">{learnedCards.size} cards</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2.5">
            <Button className="w-full gap-2 h-12 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md shadow-primary-500/20 cursor-pointer font-semibold"
              disabled={notLearnedCards.size === 0} onClick={onReviewUnmastered}>
              <Play className="h-5 w-5" /> Review Unmastered ({notLearnedCards.size})
            </Button>
            <Button className="w-full gap-2 h-12 rounded-xl bg-transparent cursor-pointer font-semibold" variant="outline" onClick={onResetSession}>
              <RotateCcw className="h-5 w-5" /> Start Over
            </Button>
            <Button className="w-full gap-2 h-12 rounded-xl bg-transparent cursor-pointer font-semibold" variant="outline" onClick={onGoToList}>
              <ArrowLeft className="h-5 w-5" /> Back to List
            </Button>
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
      <DialogContent className="max-w-3xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="notebook-heading text-2xl font-extrabold text-center mb-4">Shadowing Practice</DialogTitle>
        </DialogHeader>
        {currentItem && currentItem.examples.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button size="icon" variant="outline" aria-label="Previous sentence" onClick={() => setCurrentSentence(Math.max(0, currentSentence - 1))} disabled={currentSentence === 0}
                className="rounded-full h-10 w-10 border-primary-200 hover:bg-primary-50 cursor-pointer">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-sm font-semibold text-gray-500">Sentence {currentSentence + 1} / {currentItem.examples.length}</span>
              <Button size="icon" variant="outline" aria-label="Next sentence" onClick={() => setCurrentSentence(Math.min(currentItem.examples.length - 1, currentSentence + 1))} disabled={currentSentence === currentItem.examples.length - 1}
                className="rounded-full h-10 w-10 border-primary-200 hover:bg-primary-50 cursor-pointer">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 bg-primary-50/40 rounded-xl border border-primary-100/60">
              <p className="text-xl mb-3 text-gray-900 font-medium">{currentItem.examples[currentSentence]?.en}</p>
              <p className="text-base text-gray-400">{currentItem.examples[currentSentence]?.vi}</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Button size="lg" variant={isRecording ? "destructive" : "default"} onClick={() => setIsRecording(!isRecording)}
                className={`h-24 w-24 rounded-full cursor-pointer ${!isRecording ? "bg-gradient-to-br from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-lg shadow-primary-500/25" : ""}`}>
                {isRecording ? <Square className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
              </Button>
              <p className="text-sm text-gray-400 font-medium">{isRecording ? "Recording... Click to stop" : "Click to start recording"}</p>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" className="gap-2 bg-transparent rounded-xl border-primary-200 hover:bg-primary-50 text-primary-600 font-semibold cursor-pointer"
                onClick={() => speakText(currentItem.examples[currentSentence]?.en || "")}>
                <Volume2 className="h-4 w-4" /> Play Original
              </Button>
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
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="notebook-heading text-xl">Create New Notebook</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-600">Notebook Type</Label>
            <RadioGroup value={newCollectionType} onValueChange={(v) => setNewCollectionType(v as CollectionType)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vocabulary" id="vocab" />
                <Label htmlFor="vocab" className="flex items-center gap-2 cursor-pointer font-medium"><BookOpen className="h-4 w-4 text-primary-500" /> Vocabulary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="grammar" id="grammar" />
                <Label htmlFor="grammar" className="flex items-center gap-2 cursor-pointer font-medium"><FileText className="h-4 w-4 text-secondary-500" /> Grammar</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="collection-name" className="text-sm font-semibold text-gray-600">Notebook Name</Label>
            <Input id="collection-name" placeholder={newCollectionType === "vocabulary" ? "e.g., IELTS Vocabulary" : "e.g., Advanced Tenses"} value={newCollectionName} onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              className="h-11 rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setNewCollectionOpen(false)} className="bg-transparent rounded-xl border-gray-200 cursor-pointer">Cancel</Button>
          <Button onClick={onAddCollection} disabled={!newCollectionName.trim()}
            className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md shadow-primary-500/20 cursor-pointer font-semibold">
            Create
          </Button>
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
  const handleVocabSelect = (word: DictionaryWordResult) => {
    setNewItem({
      ...newItem,
      word: word.word,
      pronunciation: word.pronunciation || "",
      meaning: word.meaning,
      vietnamese: word.vietnameseMeaning,
      example: word.exampleSentence,
      exampleVi: word.exampleTranslation,
      partOfSpeech: word.partOfSpeech,
      level: word.level,
    })
  }

  return (
    <Dialog open={addItemOpen} onOpenChange={setAddItemOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="notebook-heading text-xl">Add New Word</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <VocabDictionarySearch onSelect={handleVocabSelect} />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Word *</Label><Input placeholder="e.g., Accomplish" value={newItem.word} onChange={(e) => setNewItem({ ...newItem, word: e.target.value })} className="h-11 rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
            <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Pronunciation</Label><Input placeholder="e.g., /əˈkʌmplɪʃ/" value={newItem.pronunciation} onChange={(e) => setNewItem({ ...newItem, pronunciation: e.target.value })} className="h-11 rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
          </div>
          <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Meaning (Target Language) - one per line</Label><Textarea placeholder="To complete something successfully" value={newItem.meaning} onChange={(e) => setNewItem({ ...newItem, meaning: e.target.value })} className="min-h-[80px] rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
          <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Vietnamese - one per line</Label><Textarea placeholder="Hoàn thành, đạt được" value={newItem.vietnamese} onChange={(e) => setNewItem({ ...newItem, vietnamese: e.target.value })} className="min-h-[80px] rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Example (Target Language)</Label><Input placeholder="She accomplished her goals." value={newItem.example} onChange={(e) => setNewItem({ ...newItem, example: e.target.value })} className="h-11 rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
            <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Example (Vietnamese)</Label><Input placeholder="Cô ấy đã hoàn thành mục tiêu." value={newItem.exampleVi} onChange={(e) => setNewItem({ ...newItem, exampleVi: e.target.value })} className="h-11 rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Part of Speech</Label>
              <Select value={newItem.partOfSpeech} onValueChange={(v) => setNewItem({ ...newItem, partOfSpeech: v })}>
                <SelectTrigger className="h-11 rounded-xl border-primary-200"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-xl"><SelectItem value="noun">Noun</SelectItem><SelectItem value="verb">Verb</SelectItem><SelectItem value="adjective">Adjective</SelectItem><SelectItem value="adverb">Adverb</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Level</Label>
              <Select value={newItem.level} onValueChange={(v) => setNewItem({ ...newItem, level: v })}>
                <SelectTrigger className="h-11 rounded-xl border-primary-200"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-xl"><SelectItem value="A1">A1</SelectItem><SelectItem value="A2">A2</SelectItem><SelectItem value="B1">B1</SelectItem><SelectItem value="B2">B2</SelectItem><SelectItem value="C1">C1</SelectItem><SelectItem value="C2">C2</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Tags (comma separated)</Label><Input placeholder="business, formal" value={newItem.tags} onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })} className="h-11 rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setAddItemOpen(false)} className="bg-transparent rounded-xl border-gray-200 cursor-pointer">Cancel</Button>
          <Button onClick={onAddItem} disabled={!newItem.word.trim()}
            className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md shadow-primary-500/20 cursor-pointer font-semibold">
            Add Word
          </Button>
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
  const handleGrammarSelect = (grammar: DictionaryGrammarResult) => {
    const firstExample = grammar.examples[0]
    setNewGrammar({
      ...newGrammar,
      title: grammar.title,
      explanation: grammar.explanation,
      category: grammar.category,
      level: grammar.level,
      exampleEn: firstExample?.en || "",
      exampleVi: firstExample?.vi || "",
    })
  }

  return (
    <Dialog open={addGrammarOpen} onOpenChange={setAddGrammarOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="notebook-heading text-xl">Add Grammar Rule</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <GrammarDictionarySearch onSelect={handleGrammarSelect} />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Title *</Label><Input placeholder="e.g., Present Perfect Tense" value={newGrammar.title} onChange={(e) => setNewGrammar({ ...newGrammar, title: e.target.value })} className="h-11 rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
            <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Category</Label>
              <Select value={newGrammar.category} onValueChange={(v) => setNewGrammar({ ...newGrammar, category: v })}>
                <SelectTrigger className="h-11 rounded-xl border-primary-200"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-xl"><SelectItem value="Tenses">Tenses</SelectItem><SelectItem value="Conditionals">Conditionals</SelectItem><SelectItem value="Voice">Voice</SelectItem><SelectItem value="Clauses">Clauses</SelectItem><SelectItem value="Speech">Speech</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Rule Formula *</Label><Input placeholder="e.g., Subject + have/has + past participle" value={newGrammar.rule} onChange={(e) => setNewGrammar({ ...newGrammar, rule: e.target.value })} className="h-11 rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
          <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Explanation</Label><Textarea placeholder="Explain when and how to use this grammar rule..." value={newGrammar.explanation} onChange={(e) => setNewGrammar({ ...newGrammar, explanation: e.target.value })} className="min-h-[100px] rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Example (Target Language)</Label><Input placeholder="I have visited Paris." value={newGrammar.exampleEn} onChange={(e) => setNewGrammar({ ...newGrammar, exampleEn: e.target.value })} className="h-11 rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
            <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Example (Vietnamese)</Label><Input placeholder="Tôi đã đến Paris." value={newGrammar.exampleVi} onChange={(e) => setNewGrammar({ ...newGrammar, exampleVi: e.target.value })} className="h-11 rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
          </div>
          <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Level</Label>
            <Select value={newGrammar.level} onValueChange={(v) => setNewGrammar({ ...newGrammar, level: v })}>
              <SelectTrigger className="h-11 rounded-xl border-primary-200"><SelectValue /></SelectTrigger>
              <SelectContent className="rounded-xl"><SelectItem value="A1">A1</SelectItem><SelectItem value="A2">A2</SelectItem><SelectItem value="B1">B1</SelectItem><SelectItem value="B2">B2</SelectItem><SelectItem value="C1">C1</SelectItem><SelectItem value="C2">C2</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setAddGrammarOpen(false)} className="bg-transparent rounded-xl border-gray-200 cursor-pointer">Cancel</Button>
          <Button onClick={onAddGrammar} disabled={!newGrammar.title.trim() || !newGrammar.rule.trim()}
            className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md shadow-primary-500/20 cursor-pointer font-semibold">
            Add Rule
          </Button>
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="notebook-heading text-xl">Edit Word</DialogTitle>
        </DialogHeader>
        {editingItem && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Word</Label><Input value={editingItem.word} onChange={(e) => setEditingItem({ ...editingItem, word: e.target.value })} className="h-11 rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
              <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Pronunciation</Label><Input value={editingItem.pronunciation} onChange={(e) => setEditingItem({ ...editingItem, pronunciation: e.target.value })} className="h-11 rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
            </div>
            <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Meaning</Label><Textarea value={editingItem.meaning.join("\n")} onChange={(e) => setEditingItem({ ...editingItem, meaning: e.target.value.split("\n").filter(Boolean) })} className="min-h-[80px] rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
            <div className="space-y-2"><Label className="text-sm font-semibold text-gray-600">Vietnamese</Label><Textarea value={editingItem.vietnamese.join("\n")} onChange={(e) => setEditingItem({ ...editingItem, vietnamese: e.target.value.split("\n").filter(Boolean) })} className="min-h-[80px] rounded-xl border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100" /></div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => setEditItemOpen(false)} className="bg-transparent rounded-xl border-gray-200 cursor-pointer">Cancel</Button>
          <Button onClick={onEditItem}
            className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md shadow-primary-500/20 cursor-pointer font-semibold">
            Save
          </Button>
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
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="notebook-heading text-xl">Delete Item</DialogTitle>
        </DialogHeader>
        <p className="text-gray-500 py-4">Are you sure you want to delete this item? This action cannot be undone.</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)} className="bg-transparent rounded-xl border-gray-200 cursor-pointer">Cancel</Button>
          <Button variant="destructive" onClick={onDeleteItem} className="rounded-xl cursor-pointer font-semibold">Delete</Button>
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
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="notebook-heading text-xl">Delete Notebook</DialogTitle>
        </DialogHeader>
        <p className="text-gray-500 py-4">
          Are you sure you want to delete this notebook? All items inside will also be deleted. This action cannot be undone.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteNotebookOpen(false)} className="bg-transparent rounded-xl border-gray-200 cursor-pointer">Cancel</Button>
          <Button variant="destructive" onClick={onDeleteNotebook} className="rounded-xl cursor-pointer font-semibold">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
