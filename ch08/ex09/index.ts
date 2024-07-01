export class Resource {
  called: string[];
  constructor() {
    this.called = [];
  }
  doA() {}
  doB() {}
  close() {}
}

export function withResource(
  resource: Resource,
  func: (res: Resource) => void,
) {
  try {
    func(resource);
  } finally {
    resource.close();
  }
}
