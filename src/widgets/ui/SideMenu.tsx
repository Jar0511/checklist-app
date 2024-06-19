import {
	FolderAtom,
	FolderErrAtom,
	FolderLoading,
	fetchFolder,
} from "@/features/profile/upload";
import {
	Callout,
	FilledButton,
	SearchInput,
	SkeletonWrapper,
} from "@/shared/ui";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { HiHome } from "react-icons/hi";
import { MdOutlineArrowBack } from "react-icons/md";
import {
	useNavigate,
	useSearchParams,
} from "react-router-dom";

export const DashboardSideMenu = () => {
	const SEARCH_KEY = "name";
	const TARGET_KEY = "target";
	const navigate = useNavigate();
	const [search, setSearch] = useSearchParams();
	const { folder, more } = useAtomValue(FolderAtom);
	const fetcher = useSetAtom(fetchFolder);
	const err = useAtomValue(FolderErrAtom);
	const loading = useAtomValue(FolderLoading);
	const targetName = search.get(TARGET_KEY);

	useEffect(() => {
		fetcher();

		window.addEventListener("focus", () => fetcher());
		return () => {
			window.removeEventListener("focus", () => fetcher());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<aside className="w-full overflow-auto border-solid sm:w-[320px] flex flex-col gap-2 items-start">
			<FilledButton
				aria-label={targetName ? "back" : "home"}
				className="px-0"
				onClick={() =>
					targetName
						? setSearch({
								...Object.fromEntries(search),
								[TARGET_KEY]: "",
							})
						: navigate("/room/list")
				}
			>
				{targetName ? <MdOutlineArrowBack /> : <HiHome />}
			</FilledButton>

			<div className="flex flex-col flex-1 w-full">
				{err ? (
					<Callout type="error" className="border">
						{err.statusText}: {err.data}
					</Callout>
				) : loading ? (
					<SkeletonWrapper className="flex-1">
						<div className="w-full h-full" />
					</SkeletonWrapper>
				) : (
					<>
						<SearchInput queryKey={SEARCH_KEY} realTime />
						{folder
							.filter(
								(title) =>
									!search.get(SEARCH_KEY) ||
									title.includes(
										search.get(SEARCH_KEY) as string
									)
							)
							.map((title) => (
								<p
									key={title}
									onClick={() =>
										setSearch({
											...Object.fromEntries(search),
											[TARGET_KEY]: title,
											[SEARCH_KEY]: title,
										})
									}
								>
									{title}
								</p>
							))}
						{more && (
							<FilledButton
								onClick={() => fetcher()}
								size="sm"
							>
								더 불러오기
							</FilledButton>
						)}
					</>
				)}
			</div>
		</aside>
	);
};
