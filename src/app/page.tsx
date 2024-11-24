"use client";
import Link from "next/link";
import Column from "@/app/components/Column";
import { useState } from "react";
import { DragEndEvent, DndContext } from "@dnd-kit/core";

export default function Dashboard() {
	const [newIssues, setNewIssues] = useState<IssueType[]>([
		{
			id: "1",
			customer_name: "David",
			title: "How can I access my account?",
			date: "25th December, 2025",
			status: "new",
		},
	]);
	const [openIssues, setOpenIssues] = useState<IssueType[]>([
		{
			id: "2",
			customer_name: "David",
			title: "My password is not working and I need it fixed ASAP",
			date: "20th July, 2023",
			status: "open",
		},
		{
			id: "3",
			customer_name: "David",
			title: "First Issues",
			date: "5th February, 2023",
			status: "open",
		},
		{
			id: "4",
			customer_name: "David",
			title: "First Issues",
			date: "2nd March, 2023",
			status: "open",
		},
		{
			id: "5",
			customer_name: "David",
			title:
				"What is wrong with your network? I can't access my profile settings account",
			date: "5th August, 2024",
			status: "open",
		},
	]);
	const [closedIssues, setClosedIssues] = useState<IssueType[]>([
		{
			id: "6",
			customer_name: "David",
			title: "First Issues",
			date: "2nd March, 2023",
			status: "closed",
		},
		{
			id: "7",
			customer_name: "Jeremiah Chibuike",
			title:
				"What is wrong with your network? I can't access my profile settings account",
			date: "5th August, 2024",
			status: "closed",
		},
		{
			id: "8",
			customer_name: "David",
			title: "First Issues",
			date: "2nd March, 2023",
			status: "closed",
		},
		{
			id: "9",
			customer_name: "David",
			title:
				"What is wrong with your network? I can't access my profile settings account",
			date: "5th August, 2024",
			status: "closed",
		},
		{
			id: "10",
			customer_name: "David",
			title:
				"What is wrong with your network? I can't access my profile settings account",
			date: "5th August, 2024",
			status: "closed",
		},
	]);

	// Helper function to find and remove an issue from a list
	const findAndRemoveIssue = (
		issues: IssueType[],
		setIssues: React.Dispatch<React.SetStateAction<IssueType[]>>,
		currentIssueId: string
	): IssueType | null => {
		const issueIndex = issues.findIndex((issue) => issue.id === currentIssueId);
		if (issueIndex === -1) return null; // Not found

		const [removedIssue] = issues.splice(issueIndex, 1);
		setIssues([...issues]); // Update state after removal
		return removedIssue;
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;

		const issueId = active.id as string;
		const newStatus = over.id as ColumnStatus["status"];

		let movedIssue: IssueType | null = null;

		// Find and remove the issue from its current state
		movedIssue =
			movedIssue ||
			findAndRemoveIssue(newIssues, setNewIssues, issueId) ||
			findAndRemoveIssue(openIssues, setOpenIssues, issueId) ||
			findAndRemoveIssue(closedIssues, setClosedIssues, issueId);

		// If an issue was successfully removed, add it to the new column
		if (movedIssue) {
			movedIssue.status = newStatus; // Update the status of the issue

			if (newStatus === "new") {
				setNewIssues((prev) => [...prev, movedIssue]);
			} else if (newStatus === "open") {
				setOpenIssues((prev) => [...prev, movedIssue]);
			} else if (newStatus === "closed") {
				setClosedIssues((prev) => [...prev, movedIssue]);
			}
		}
	};

	return (
		<main>
			<nav className='w-full h-[10vh] flex items-center justify-between px-8 bg-blue-100 top-0 sticky z-10'>
				<Link href='/' className='font-bold text-2xl'>
					Suportfix
				</Link>
				<Link
					href='/'
					className='bg-blue-500 px-4 py-3 rounded-md text-blue-50'
				>
					SUPPORT CENTER
				</Link>
			</nav>

			<div className='w-full min-h-[90vh] lg:p-8 p-6 flex flex-col lg:flex-row items-start justify-between lg:space-x-4'>
				<DndContext onDragEnd={handleDragEnd}>
					<Column
						bg_color='red'
						id='new'
						title={`New (${newIssues.length})`}
						issues={newIssues}
					/>

					<Column
						bg_color='purple'
						id='open'
						title={`Open (${openIssues.length})`}
						issues={openIssues}
					/>

					<Column
						bg_color='green'
						id='closed'
						title={`Closed (${closedIssues.length})`}
						issues={closedIssues}
					/>
				</DndContext>
			</div>
		</main>
	);
}
