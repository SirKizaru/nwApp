import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Platform } from '@/types'
import { cn } from '@/lib/utils'

interface PlatformSelectorProps {
  platforms: Platform[]
  selectedPlatforms: string[]
  onPlatformToggle: (platformId: string) => void
  className?: string
}

export function PlatformSelector({ 
  platforms, 
  selectedPlatforms, 
  onPlatformToggle, 
  className 
}: PlatformSelectorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>Select Platforms</Label>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <Badge
            key={platform.id}
            variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all hover:scale-105",
              selectedPlatforms.includes(platform.id) ? platform.color : 'hover:bg-gray-100'
            )}
            onClick={() => onPlatformToggle(platform.id)}
          >
            <span className="flex items-center gap-2">
              {platform.name}
              {platform.isConnected && (
                <span className="w-2 h-2 bg-green-500 rounded-full" />
              )}
            </span>
          </Badge>
        ))}
      </div>
      {selectedPlatforms.length === 0 && (
        <p className="text-sm text-muted-foreground">Select at least one platform to post to</p>
      )}
    </div>
  )
}