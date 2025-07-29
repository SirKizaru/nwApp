import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Play, Clock, TrendingUp } from 'lucide-react'
import { VideoUploader } from '@/components/VideoUploader'
import { PlatformSelector } from '@/components/PlatformSelector'
import { ScheduleSelector } from '@/components/ScheduleSelector'
import { Platform } from '@/types'

export default function Index() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [caption, setCaption] = useState('')
  const [hashtags, setHashtags] = useState('')

  const platforms: Platform[] = [
    { id: 'tiktok', name: 'TikTok', color: 'bg-black text-white', isConnected: true },
    { id: 'reels', name: 'Instagram Reels', color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white', isConnected: true },
    { id: 'youtube', name: 'YouTube Shorts', color: 'bg-red-500 text-white', isConnected: false }
  ]

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    )
  }

  const handleSchedulePost = () => {
    if (!videoFile || selectedPlatforms.length === 0) {
      alert('Please select a video and at least one platform')
      return
    }
    
    console.log('Scheduling post:', {
      videoFile: videoFile.name,
      caption,
      hashtags,
      platforms: selectedPlatforms,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime
    })
    
    // Here you would integrate with your backend API
    alert('Post scheduled successfully!')
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">VideoPost Scheduler</h1>
        <p className="text-xl text-muted-foreground">
          Schedule and manage your video posts across TikTok, Reels, and YouTube Shorts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Posts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5K</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Video Upload & Scheduling */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>
              Upload your video and schedule it across multiple platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Upload */}
            <VideoUploader 
              onVideoSelect={setVideoFile}
              selectedVideo={videoFile || undefined}
            />

            {/* Caption */}
            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                placeholder="Write your video caption here..."
                className="min-h-[100px]"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            {/* Hashtags */}
            <div className="space-y-2">
              <Label htmlFor="hashtags">Hashtags</Label>
              <Input
                id="hashtags"
                placeholder="#trending #viral #fyp"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
              />
            </div>

            {/* Platform Selection */}
            <PlatformSelector
              platforms={platforms}
              selectedPlatforms={selectedPlatforms}
              onPlatformToggle={togglePlatform}
            />

            {/* Schedule Selector */}
            <ScheduleSelector
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateSelect={setSelectedDate}
              onTimeSelect={setSelectedTime}
            />

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleSchedulePost}>
                Schedule Post
              </Button>
              <Button variant="outline" className="flex-1">
                Save as Draft
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Posts Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Posts</CardTitle>
            <CardDescription>
              Your scheduled video posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample scheduled posts */}
              {[
                {
                  title: "Morning Workout Routine",
                  date: "Today, 2:00 PM",
                  platforms: ["tiktok", "reels"],
                  status: "scheduled"
                },
                {
                  title: "Cooking Tutorial: Pasta",
                  date: "Tomorrow, 6:00 PM",
                  platforms: ["youtube", "reels"],
                  status: "scheduled"
                },
                {
                  title: "Travel Vlog: Beach Day",
                  date: "Dec 30, 10:00 AM",
                  platforms: ["tiktok", "youtube", "reels"],
                  status: "draft"
                }
              ].map((post, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{post.title}</h3>
                    <Badge variant={post.status === "scheduled" ? "default" : "secondary"}>
                      {post.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                  <div className="flex gap-1">
                    {post.platforms.map((platformId) => {
                      const platform = platforms.find(p => p.id === platformId)
                      return (
                        <Badge key={platformId} variant="outline" className="text-xs">
                          {platform?.name}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}