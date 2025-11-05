export type Node = {
	name: string;
	children: ReadonlyArray<Node> | null;
};
