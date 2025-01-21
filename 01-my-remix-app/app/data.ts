////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}

[
  {
    avatar:
      "https://imagenes.noticiasrcn.com/cms/2024/05/25102632/daniel-martinez-segundo-giro-de-italia.webp?w=960",
    first: "Daniel Felipe",
    last: "Matinez",
    twitter: "2do lugar en el Giro de Italia 2024",
  },
  {
    avatar:
      "https://cdn.bitlysdowssl-aws.com/wp-content/uploads/2021/05/Egan-Bernal-brillante-ganador-del-Giro-de-Italia-2021.jpg",
    first: "Egan",
    last: "Bernal",
    twitter: "1er lugar en el Tour de Francia 2019 y el Giro de Italia 2021",
  },
  {
    avatar:
      "https://www.futbolred.com/files/article_main/uploads/2024/05/03/66352734da4ce.jpeg",
    first: "Nairo",
    last: "Quintana",
    twitter: "1er lugar en el Giro de Italia en 2014 y la Vuelta a España en 2021",
  },
  {
    avatar:
      "https://www.semana.com/resizer/v2/FP7WMP2TVJHKHDHIUQ4LPMOKAQ.jpg?auth=0ff2bbc829e2e261ccb9c574a56dcb6dc2ecc1be73dc5702d67b3e571aa32164&smart=true&quality=75&width=1280&height=720",
    first: "Tadej",
    last: "Pogacar",
    twitter: "1er lugar en el Tour de Francia 2020, 2021, 2024, y el Giro de Italia 2024",
  },
  {
    avatar:
      "https://i0.wp.com/www.revistamundociclistico.com/wp-content/uploads/2025/01/Jonas-Vingegaard-2025.jpg?w=1200&ssl=1",
    first: "Jonas",
    last: "Vingegaard",
    twitter: "1er lugar en el Tour de Francia 2022, 2023, y 2do lugar en el Tour de Francia 2021",
  },
  {
    avatar:
      "https://phantom-marca.unidadeditorial.es/8600f81f2e93f15649148a22a9e48662/resize/660/f/webp/assets/multimedia/imagenes/2023/10/10/16969285414158.jpg",
    first: "Rigoberto",
    last: "Urán",
    twitter: "2do lugar lugar en el Giro de Italia 2013 y 2014, y 2do lugar en el Tour de Francia 2017",
  },
  {
    avatar:
      "https://www.semana.com/resizer/v2/3NG7TWZYB5DCZKUS4KNCT2XJKA.jpg?auth=b743336b9f8fd9cbb2c0f052114d765e820b86a5e66bb29a5529751268011af0&smart=true&quality=75&width=1280&height=720",
    first: "Sergio",
    last: "Higuita",
    twitter: "Ganador de la etapa 18 de la Vuelta a España en 2019, Campeón Nacional de Ruta de Colombia 2020",
  },
  {
    avatar:
      "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/07/23/16/chris-froome.jpg?quality=75&width=1250&crop=3%3A2%2Csmart&auto=webp",
    first: "Chris",
    last: "Froome",
    twitter: "1er lugar en el Tour de Francia (2013, 2015, 2016, 2017), 1er lugar en la Vuelta a España (2017), 1er lugar en el Giro de Italia (2018)",
  },
  {
    avatar:
      "https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w1460/f_auto/v1630936903/primary/q7auyupjvwhk4xln9tnx",
    first: "Richard",
    last: "Carapaz",
    twitter: "1er lugar en el Giro de Italia (2019), 2do lugar en la Vuelta a España (2020), 3er lugar en el Tour de Francia (2021)",
  },
  {
    avatar:
      "https://phantom-marca.unidadeditorial.es/c84b9ba2f5ad8a638817dbf7f5a51267/resize/660/f/webp/assets/multimedia/imagenes/2023/04/24/16823260393697.jpg",
    first: "Remco",
    last: "Evenepoel",
    twitter: "1er lugar en la Vuelta a España 2022",
  },
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`,
  });
});
