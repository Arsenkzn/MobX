import { makeAutoObservable, runInAction } from "mobx";
import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";
import axios from "axios";

export const contactStore = makeAutoObservable({
  all: [] as ContactDto[],
  filtered: [] as ContactDto[],
  favorites: [] as string[],
  loading: false,
  error: "",
  currentGroupId: undefined as GroupContactsDto | undefined,

  async getContacts() {
    this.loading = true;
    this.error = "";

    try {
      const response = await axios.get<ContactDto[]>(
        "https://mocki.io/v1/25eb3aa1-9c8f-4762-a7e2-375d674e3fb6"
      );

      runInAction(() => {
        this.all = response.data;
        this.filtered = response.data;
        this.favorites = response.data.slice(0, 4).map((contact) => contact.id);
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Что-то пошло не так :(";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  },
  getContactById(contactId: ContactDto["id"]) {
    return this.all.find(({ id }) => id === contactId);
  },
  filterContactByName(name: string) {
    const searchName = name.toLowerCase();
    this.filtered = this.all.filter((contact) =>
      contact.name.toLowerCase().includes(searchName)
    );
  },
  setCurrentGroupId(currentGroup: GroupContactsDto) {
    this.currentGroupId = currentGroup;
  },
  filterByCurrentGroupId() {
    this.filtered = this.filtered.filter(({ id }) => {
      return this.currentGroupId?.contactIds.includes(id);
    });
  },
  unsetCurrentGroupId() {
    this.currentGroupId = undefined;
    this.filtered = this.all;
  },
});