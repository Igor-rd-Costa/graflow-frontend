
export type Project = {
  id: string
  name: string
}

export type ProjectInfo = {
  id: string,
  name: string
}

//TODO Integrate with backend
export default class ProjectService {
  private static readonly infos: ProjectInfo[] = [
    {id: 'a', name: 'New Project'},
    {id: 'b', name: 'AAA'},
    {id: 'c', name: 'My render'},
    {id: 'd', name: 'Test'},
  ];
  
  private constructor() {}
  
  //TODO Move to ProjectContext
  public static Project() {
    return null;
  }

  public static GetProjectsInfo(): ProjectInfo[] {
    return this.infos;
  }

  public static Create(name: string): Project|null {
    return {id: 'dsadsadsa', name};
  }

  public static Load(id: string): Project|null {
    return this.GetProject(id);
  }

  private static GetProject(id: string): Project|null {
    for (let i = 0; i < this.infos.length; i++) {
      if (this.infos[i].id === id) {
        return {id, name: this.infos[i].name}
      }
    }
    return null;
  }
}