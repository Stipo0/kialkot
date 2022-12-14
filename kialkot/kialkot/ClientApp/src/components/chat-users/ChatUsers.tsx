import classNames from "classnames";
import { useEffect, useState } from "react";
import { ChatJobsModel } from "../../models/chat.models";
import { chatService } from "../../service/chat.service";
import { HanleCatch } from "../../util/handleCatch";

interface ChatJobsProps {
	setJobId: (jobId: number) => void;
}

const ChatJobs = ({setJobId}: ChatJobsProps) => {
	const [jobs, setJobs] = useState<ChatJobsModel[]>([]);

	useEffect(() => {
		const fetchJobs =async () => {
			try {
				setJobs(await chatService.getJobs());
			} catch (e) {
				alert(HanleCatch(e))
			}
		}
		fetchJobs();
	}, [])

  return (
		<div className="panel panel-default">
			<div className="panel-body card">
				{jobs.map((job) => (
					<div key={job.id} onClick={() => setJobId(job.id)} className={classNames({"newMessage" : job.newMessage}, "card  text-center m-2 p-1 col-10")}>
						{job.name}
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatJobs;
