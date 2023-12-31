import { Lesson } from "$lib/lessons/lesson"

export async function load({ parent, fetch }) {
    const { config } = await parent();
    let lesson = await Lesson.getLast(config, fetch);
    return { lesson };
}
