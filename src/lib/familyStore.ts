// Client-side opslag van zelf toegevoegde families (localStorage), zodat een nieuwe
// familie blijft staan en een eigen werkmap krijgt. De demo-familie Wattel is statisch
// en zit hier NIET in; die is en blijft het ingebouwde voorbeeld.

export interface StoredNote {
  id: string;
  date: string;
  author: string;
  category: number | null;
  body: string;
}

export interface StoredFamily {
  id: string;
  name: string;
  business: string;
  status: string;
  createdAt: string;
  logfile: StoredNote[];
}

const KEY = 'dw_families';

function read(): StoredFamily[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredFamily[]) : [];
  } catch {
    return [];
  }
}

function write(list: StoredFamily[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

const uid = (p: string) => `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export function getFamilies(): StoredFamily[] {
  return read();
}

export function getFamily(id: string): StoredFamily | undefined {
  return read().find((f) => f.id === id);
}

export function addFamily(name: string, business: string): StoredFamily {
  const fam: StoredFamily = {
    id: uid('f'),
    name: name.trim(),
    business: (business || '').trim() || 'Nieuw familiebedrijf',
    status: 'concept',
    createdAt: new Date().toISOString(),
    logfile: [],
  };
  const list = read();
  list.unshift(fam);
  write(list);
  return fam;
}

export function deleteFamily(id: string) {
  write(read().filter((f) => f.id !== id));
}

export function addNote(id: string, note: { author: string; category: number | null; body: string }): StoredFamily | undefined {
  const list = read();
  const fam = list.find((f) => f.id === id);
  if (!fam) return undefined;
  fam.logfile.unshift({
    id: uid('n'),
    date: new Date().toISOString(),
    author: note.author,
    category: note.category,
    body: note.body,
  });
  write(list);
  return fam;
}
