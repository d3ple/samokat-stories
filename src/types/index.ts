

export interface StoryItem {
    title: string,
    slug: string,
    type: "review" | "recipe",
}

export interface StorySamokat {
    type: "fullscreen-image" | "video",
    duration: number,
    data: {
        backgroundColor: string,
        image?: string,
        url?: string
    },
    components: any
}

export interface AirtableStoryType {
    type: "review" | "recipe",
    title: string
}

export interface AirtableStory {
    slug: string,
    title: string,
    type: "review" | "recipe", 
}

export interface AirtableSlideType {
    type: "fullscreen-image" | "video",
}

export interface AirtableSlide {
    id: string,
    story: string,
    order: number,
    type: "fullscreen-image" | "video", 
    url: string,
    "bg-color"?: string
}