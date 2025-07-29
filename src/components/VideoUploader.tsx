import { useState, useCallback } from 'react'
import { Upload, X, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface VideoUploaderProps {
  onVideoSelect: (file: File) => void
  selectedVideo?: File
  className?: string
}

export function VideoUploader({ onVideoSelect, selectedVideo, className }: VideoUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('video/')) {
        onVideoSelect(file)
        createPreview(file)
      }
    }
  }, [onVideoSelect])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      onVideoSelect(file)
      createPreview(file)
    }
  }

  const createPreview = (file: File) => {
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  const clearVideo = () => {
    setPreview(null)
    onVideoSelect(null as any)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Label>Video File</Label>
      
      {!selectedVideo ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer",
            dragActive 
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950" 
              : "border-gray-300 hover:border-gray-400"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('video-upload')?.click()}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div>
            <p className="text-lg font-medium text-blue-600 hover:text-blue-500">
              Upload a video
            </p>
            <p className="text-gray-500">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">MP4, MOV, AVI up to 500MB</p>
          
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Play className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-medium truncate">{selectedVideo.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(selectedVideo.size)}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={clearVideo}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {preview && (
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video
                src={preview}
                controls
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}