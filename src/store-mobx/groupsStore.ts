import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export const groupsStore = makeAutoObservable({
  all: [] as GroupContactsDto[],
  isLoading: false,
  error: null as string | null,

  async getGroups() {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.get<GroupContactsDto[]>(
        "https://mocki.io/v1/bf720a17-c3b3-4785-8469-238489df04b9"
      );
      runInAction(() => {
        this.all = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Failed to fetch groups";
        this.isLoading = false;
      });
    }
  },
});
