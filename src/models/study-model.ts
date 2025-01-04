import { Topic, Video } from "@prisma/client"

export interface CreateTopicRequest {
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
    topicId: number;
}

export function toVideoResponse(video: Video): VideoResponse {
    return {
        id: video.id,
        videoName: video.video_name,
        videoUrl: video.video_url,
        flashcard: video.flashcard,
        topicId: video.topic_id,
    };
}