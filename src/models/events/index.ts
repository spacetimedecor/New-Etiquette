enum EventTypeNames {
	Meta,
	Note
}

//
// Event Arguments:
//
export interface CommonArgs {
	sourceNodeID: string;
	type: EventTypeNames;
}

export interface MetaArgs {

}

export interface NoteArgs {
	pitch: number;
	velocity: number;
	channel: number;
}

export interface EventArgs {
	CommonArgs: CommonArgs;
	MetaArgs?: MetaArgs;
	NoteArgs?: NoteArgs;
}

//
// Event Types:
//
export interface Event {
	CommonArgs: CommonArgs;
}

export interface MetaEvent extends Event {
	MetaArgs: MetaArgs;
}

export interface NoteEvent extends Event {
	NoteArgs: NoteArgs;
}

export type AllEventTypes = Event | MetaEvent | NoteEvent;

//
// Event Creator:
//
export const eventCreator = (
	{
		CommonArgs,
		MetaArgs,
		NoteArgs
	}: EventArgs
): AllEventTypes => ({
	CommonArgs,
	...( MetaArgs && { MetaArgs }),
	...( NoteArgs && { NoteArgs }),
});

