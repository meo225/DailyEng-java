"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Calendar as CalendarIcon,
  Phone,
  MapPin,
  Users,
  Lock,
  RotateCcw,
  Pencil,
  Save,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormField } from "./FormField";
import { LEVEL_DISPLAY_MAP, parseDate } from "@/hooks/settings/types";
import type { SettingsFormData } from "@/hooks/settings/types";

// ─── Types ─────────────────────────────────────────

interface PersonalInfoFormProps {
  formData: SettingsFormData;
  isEditing: boolean;
  isPending: boolean;
  isGoogleUser: boolean;
  errorMessage: string;
  datePickerOpen: boolean;
  setDatePickerOpen: (open: boolean) => void;
  hasFieldChanged: (field: keyof SettingsFormData) => boolean;
  resetField: (field: keyof SettingsFormData) => void;
  updateField: (field: keyof SettingsFormData, value: string) => void;
  handleEditClick: () => void;
  handleCancel: () => void;
  handleSave: () => void;
  handleDateSelect: (date: Date | undefined) => void;
}

// ─── Component ─────────────────────────────────────

export function PersonalInfoForm({
  formData,
  isEditing,
  isPending,
  isGoogleUser,
  errorMessage,
  datePickerOpen,
  setDatePickerOpen,
  hasFieldChanged,
  resetField,
  updateField,
  handleEditClick,
  handleCancel,
  handleSave,
  handleDateSelect,
}: PersonalInfoFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <FormField
          label="Full name:"
          icon={User}
          value={formData.name}
          onChange={(v) => updateField("name", v)}
          isEditing={isEditing}
          hasChanged={hasFieldChanged("name")}
          onReset={() => resetField("name")}
          placeholder="Enter your full name"
          required
        />

        {/* Email */}
        <FormField
          label="Email:"
          icon={isGoogleUser ? Lock : Mail}
          value={formData.email}
          onChange={(v) => updateField("email", v)}
          isEditing={isEditing}
          hasChanged={hasFieldChanged("email")}
          onReset={() => resetField("email")}
          placeholder="Enter your email"
          required
          disabled={isGoogleUser}
          labelSuffix={
            isGoogleUser ? (
              <span className="ml-2 text-xs text-muted-foreground font-normal">
                (Google account)
              </span>
            ) : undefined
          }
        />

        {/* Date of Birth */}
        <DateOfBirthField
          value={formData.dateOfBirth}
          isEditing={isEditing}
          datePickerOpen={datePickerOpen}
          setDatePickerOpen={setDatePickerOpen}
          hasChanged={hasFieldChanged("dateOfBirth")}
          onReset={() => resetField("dateOfBirth")}
          onDateSelect={handleDateSelect}
        />

        {/* Phone Number */}
        <FormField
          label="Phone number:"
          icon={Phone}
          value={formData.phoneNumber}
          onChange={(v) => updateField("phoneNumber", v)}
          isEditing={isEditing}
          hasChanged={hasFieldChanged("phoneNumber")}
          onReset={() => resetField("phoneNumber")}
          placeholder="Enter your phone number"
        />

        {/* Gender */}
        <GenderField
          value={formData.gender}
          onChange={(v) => updateField("gender", v)}
          isEditing={isEditing}
          hasChanged={hasFieldChanged("gender")}
          onReset={() => resetField("gender")}
        />

        {/* Address */}
        <FormField
          label="Address:"
          icon={MapPin}
          value={formData.address}
          onChange={(v) => updateField("address", v)}
          isEditing={isEditing}
          hasChanged={hasFieldChanged("address")}
          onReset={() => resetField("address")}
          placeholder="Enter your address"
        />
      </div>

      {/* Level */}
      <LevelField
        value={formData.level}
        onChange={(v) => updateField("level", v)}
        isEditing={isEditing}
        hasChanged={hasFieldChanged("level")}
        onReset={() => resetField("level")}
      />

      {/* Action Buttons */}
      <ActionButtons
        isEditing={isEditing}
        isPending={isPending}
        errorMessage={errorMessage}
        onEdit={handleEditClick}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}

// ─── Sub-components ────────────────────────────────

function DateOfBirthField({
  value,
  isEditing,
  datePickerOpen,
  setDatePickerOpen,
  hasChanged,
  onReset,
  onDateSelect,
}: {
  value: string;
  isEditing: boolean;
  datePickerOpen: boolean;
  setDatePickerOpen: (open: boolean) => void;
  hasChanged: boolean;
  onReset: () => void;
  onDateSelect: (date: Date | undefined) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">
        Date of birth:
      </label>
      <div className="relative">
        <Popover
          open={datePickerOpen && isEditing}
          onOpenChange={setDatePickerOpen}
        >
          <PopoverTrigger asChild>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={value}
                readOnly
                disabled={!isEditing}
                placeholder="DD/MM/YYYY"
                className={cn(
                  "pl-10 border-input cursor-pointer",
                  !isEditing &&
                    "disabled:opacity-100 disabled:text-foreground disabled:cursor-default",
                  hasChanged && isEditing && "pr-10",
                )}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={parseDate(value) || undefined}
              onSelect={onDateSelect}
              defaultMonth={parseDate(value) || new Date(2000, 0, 1)}
              captionLayout="dropdown"
              fromYear={1950}
              toYear={new Date().getFullYear()}
            />
          </PopoverContent>
        </Popover>
        {isEditing && hasChanged && (
          <button
            type="button"
            onClick={onReset}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            title="Reset to original"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function GenderField({
  value,
  onChange,
  isEditing,
  hasChanged,
  onReset,
}: {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  hasChanged: boolean;
  onReset: () => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">
        Sex:
      </label>
      <div className="flex items-center">
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
          <Select
            value={value}
            onValueChange={onChange}
            disabled={!isEditing}
          >
            <SelectTrigger
              className={cn(
                "pl-10 border-input w-[180px]",
                !isEditing &&
                  "disabled:opacity-100 disabled:text-foreground disabled:cursor-default",
              )}
            >
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isEditing && hasChanged && (
          <button
            type="button"
            onClick={onReset}
            className="ml-2 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            title="Reset to original"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function LevelField({
  value,
  onChange,
  isEditing,
  hasChanged,
  onReset,
}: {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  hasChanged: boolean;
  onReset: () => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">
        Level:
      </label>
      <div className="flex items-center">
        <div>
          <Select
            value={value}
            onValueChange={onChange}
            disabled={!isEditing}
          >
            <SelectTrigger
              className={cn(
                "border-input w-[200px]",
                !isEditing &&
                  "disabled:opacity-100 disabled:text-foreground disabled:cursor-default",
              )}
            >
              <SelectValue placeholder="Select your level">
                {value
                  ? LEVEL_DISPLAY_MAP[value] || value
                  : "Select your level"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A1">A1 - Beginner</SelectItem>
              <SelectItem value="A2">A2 - Beginner</SelectItem>
              <SelectItem value="B1">B1 - Intermediate</SelectItem>
              <SelectItem value="B2">B2 - Intermediate</SelectItem>
              <SelectItem value="C1">C1 - Advanced</SelectItem>
              <SelectItem value="C2">C2 - Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isEditing && hasChanged && (
          <button
            type="button"
            onClick={onReset}
            className="ml-2 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            title="Reset to original"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function ActionButtons({
  isEditing,
  isPending,
  errorMessage,
  onEdit,
  onSave,
  onCancel,
}: {
  isEditing: boolean;
  isPending: boolean;
  errorMessage: string;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 pt-4">
      <div className="flex gap-4">
        {!isEditing ? (
          <Button
            onClick={onEdit}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <>
            <Button
              onClick={onSave}
              disabled={isPending}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              <Save className="h-4 w-4 mr-2" />
              {isPending ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
              className="border-input px-8 bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </>
        )}
      </div>

      {errorMessage && (
        <p className="text-sm font-medium text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
