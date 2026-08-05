/** Team portraits served from /public/team (not bundled). */
const TEAM_BASE = `${import.meta.env.BASE_URL}team/`;

function teamPhoto(filename: string) {
  return `${TEAM_BASE}${encodeURIComponent(filename)}`;
}

export const TEAM_PHOTOS = {
  ajay: teamPhoto("Ajay_Mathur 1.png"),
  bhaskar: teamPhoto("bhaskar-natarajan.jpg"),
  boudhyyan: teamPhoto("Boudhyyan Duttaa Photo 1.png"),
  chintan: teamPhoto("Chintan Shah Photo 1.png"),
  dinesh: teamPhoto("Dinesh Photo 1.png"),
  khalfa: teamPhoto("Khalfa.png"),
  kotteswari: teamPhoto("Kotteswari Photo 1.png"),
  shinu: teamPhoto("Shinu Photo 1.png"),
  souvik: teamPhoto("Souvik Photo 1.png"),
} as const;
