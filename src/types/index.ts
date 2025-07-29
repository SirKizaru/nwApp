export interface VideoPost {
  id: string
  title: string
  caption: string
  hashtags: string[]
  videoFile?: File
  videoUrl?: string
  platforms: Platform[]
  scheduledDate?: Date
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  createdAt: Date
  updatedAt: Date
}

export interface Platform {
  id: 'tiktok' | 'reels' | 'youtube'
  name: string
  color: string
  isConnected: boolean
  accountName?: string
}

export interface ScheduleOptions {
  date: Date
  time: string
  timezone?: string
}

export interface Analytics {
  views: number
  likes: number
  comments: number
  shares: number
  engagementRate: number
}

export interface PostAnalytics extends VideoPost {
  analytics: Analytics
}