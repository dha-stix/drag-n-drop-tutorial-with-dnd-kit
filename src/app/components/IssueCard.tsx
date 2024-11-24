import { IoIosChatbubbles } from "react-icons/io";
import { useDraggable } from "@dnd-kit/core";
import { borderClasses } from "@/app/utils/styles";
import { CSS } from '@dnd-kit/utilities';

export default function IssueCard({
	item,
	bg_color,
	columnId,
}: {
	item: IssueType;
	bg_color: string;
	columnId: ColumnStatus["status"];
}) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: item.id,
	});

 const style = {
    transform: CSS.Translate.toString(transform),
 }
	
	return (
		<div
			className={`w-full min-h-[150px] cursor-grab rounded-md bg-white z-5 border-[2px] p-4 hover:shadow-lg ${
				borderClasses[bg_color] || ""
			}`}
			style={style}
			ref={setNodeRef}
			{...listeners}
			{...attributes}
		>
			<h2 className='font-bold mb-3 text-gray-700 opacity-80'>{item.title}</h2>

			<p className='text-sm opacity-50 mb-[5px]'>Date created: {item.date}</p>
			<p className='text-sm opacity-50 mb-[5px]'>
				Created by: {item.customer_name}
			</p>

			<section className='flex items-center justify-end space-x-4'>
				<button className='px-4 py-2 text-sm text-white bg-blue-400 hover:bg-blue-500 flex items-center rounded'>
					Chat <IoIosChatbubbles className='ml-[3px]' />
				</button>
				{columnId !== "closed" ? (
					<button className='px-4 py-2 text-sm text-white bg-red-400 rounded hover:bg-red-500'>
						Close Ticket
					</button>
				) : (
					<button className='px-4 py-2 text-sm text-white bg-green-400 rounded hover:bg-green-500'>
						Reopen Ticket
					</button>
				)}
			</section>
		</div>
	);
}