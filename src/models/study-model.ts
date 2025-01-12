import { Category, Topic, Video } from "@prisma/client"

export interface CreateTopicRequest {
    categoryId: any;
    topicName: string;
}

export interface TopicResponse {
    id: number;
    topicName: string;
}

export function toTopicResponse(topic: Topic): TopicResponse {
    return {
        id: topic.id,
        topicName: topic.topic_name,
    };
}

export interface CreateCategoryRequest {
    name: string;
}

export interface CategoryResponse {
    id: number;
    name: string;
}

export function toCategoryResponse(category: Category): CategoryResponse {
    return {
        id: category.id,
        name: category.name,
    };
}

export interface CreateVideoRequest {
    videoName: string;
    videoUrl: string;
    flashcard: string;
    topicId: number;
}

export interface VideoResponse {
    id: number;
    videoName: string;
    videoUrl: string;
    flashcard: string;
}

export function toVideoResponse(video: Video): VideoResponse {
    return {
        id: video.id,
        videoName: video.video_name,
        videoUrl: video.video_url,
        flashcard: video.flashcard,
    };
}