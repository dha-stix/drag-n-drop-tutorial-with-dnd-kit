import { useDroppable } from "@dnd-kit/core";
import { bgClasses, headingClasses } from "../utils/styles";
import IssueCard from "./IssueCard";
import usePagination from "../utils/hooks/usePagination";

export default function Column({ title, id, bg_color, issues }: ColumnType) {
	const { setNodeRef } = useDroppable({ id });
	const { paginatedData, handleShowMore, currentPage, isEnd } =
		usePagination(issues);

	return (
		<section
			className={`lg:w-1/3 w-full p-4 min-h-[50vh] rounded-md shadow-md lg:mb-0 mb-6 ${
				bgClasses[bg_color] || ""
			} `}
			key={id}
			ref={setNodeRef}
		>
			<header className='flex items-center justify-between'>
				<h2 className={`font-bold text-xl mb-4 ${headingClasses[bg_color]}`}>
					{title}
				</h2>
				{issues?.length > 4 && (
					<button
						className='text-gray-500 underline text-sm'
						onClick={handleShowMore}
					>
						{isEnd ? "Beginning" : `Show More (${currentPage + 1})`}
					</button>
				)}
			</header>

			<div className='flex flex-col w-full items-center space-y-4'>
				{paginatedData?.map((item) => (
					<IssueCard
						item={item}
						key={item.id}
						bg_color={bg_color}
						columnId={id}
					/>
				))}
			</div>
		</section>
	);
}