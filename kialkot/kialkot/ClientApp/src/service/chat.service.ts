import { ChatJobsModel, ChatMessagesModel, ChatSendMessagesModel } from "../models/chat.models";
import request, { Methods } from "../util/request";

class ChatService {
	async getJobs() {
		return request<ChatJobsModel[]>({
			method: Methods.GET,
			resource: `api/Chat/Jobs`,
		});
	};

	async getMessages(jobId: number) {
		return request<ChatMessagesModel[]>({
			method: Methods.GET,
			resource: `api/Chat/${jobId}`,
		})
	}

	async sendMessage(data: ChatSendMessagesModel, jobId: number) {
		return request<ChatMessagesModel>({
			method: Methods.POST,
			data,
			resource: `api/Chat/${jobId}`
		});
	}
}

export const chatService = new ChatService();