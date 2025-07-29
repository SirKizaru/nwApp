import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface ScheduleSelectorProps {
  selectedDate?: Date
  selectedTime?: string
  onDateSelect: (date: Date | undefined) => void
  onTimeSelect: (time: string) => void
  className?: string
}

export function ScheduleSelector({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  className
}: ScheduleSelectorProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const quickScheduleOptions = [
    { label: 'Post Now', value: 'now' },
    { label: 'In 1 Hour', value: '1h' },
    { label: 'Tomorrow 9 AM', value: 'tomorrow' },
    { label: 'Custom', value: 'custom' }
  ]

  const handleQuickSchedule = (value: string) => {
    const now = new Date()
    
    switch (value) {
      case 'now':
        onDateSelect(now)
        onTimeSelect(format(now, 'HH:mm'))
        break
      case '1h':
        const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000)
        onDateSelect(oneHourLater)
        onTimeSelect(format(oneHourLater, 'HH:mm'))
        break
      case 'tomorrow':
        const tomorrow = new Date(now)
        tomorrow.setDate(now.getDate() + 1)
        tomorrow.setHours(9, 0, 0, 0)
        onDateSelect(tomorrow)
        onTimeSelect('09:00')
        break
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Label>Schedule Options</Label>
      
      {/* Quick Schedule Buttons */}
      <div className="grid grid-cols-2 gap-2">
        {quickScheduleOptions.slice(0, -1).map((option) => (
          <Button
            key={option.value}
            variant="outline"
            size="sm"
            onClick={() => handleQuickSchedule(option.value)}
            className="justify-start"
          >
            <Clock className="w-4 h-4 mr-2" />
            {option.label}
          </Button>
        ))}
      </div>

      {/* Custom Date and Time */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {/* Date Picker */}
          <div>
            <Label className="text-sm">Date</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Pick date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    onDateSelect(date)
                    setIsCalendarOpen(false)
                  }}
                  disabled={(date) => date < new Date().setHours(0, 0, 0, 0)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Picker */}
          <div>
            <Label className="text-sm">Time</Label>
            <Input
              type="time"
              value={selectedTime || ''}
              onChange={(e) => onTimeSelect(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {selectedDate && selectedTime && (
          <div className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900 p-2 rounded">
            Scheduled for: {format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
          </div>
        )}
      </div>
    </div>
  )
}