export class Camera {
    id: string;
    name:string;
    model:string;
    resolution:string;
    ip:string;
  
    constructor(id: string,name: string,model:string, resolution: string, ip: string) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.resolution = resolution;
        this.ip = ip;
    }
  }