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
}

export interface ChatSendMessagesModel {
	userId: number;
	userNinckName: string;
	message: string;
}