export interface ChatJobsModel {
	id: number;
	name: string;
	newMessage: boolean;
}

export interface ChatMessagesModel {
	id: number;
	userId: number;
	userNickName: string;
	message: string
	newMessage: boolean;
	sendAt: Date;
}

export interface ChatSendMessagesModel {
	message: string;
}