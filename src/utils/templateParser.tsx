export function parseTemplate(
  template: string,
  components: Record<string, (children: React.ReactNode) => React.ReactNode>,
) {
  const parts = template.split(/(\{[\w/]+\})/);
  const result: React.ReactNode[] = [];
  let currentComponent: string | null = null;
  let buffer: string[] = [];

  parts.forEach((part, index) => {
    if (part.match(/\{(\w+)\}/)) {
      currentComponent = part.slice(1, -1);
    } else if (part === `{/${currentComponent}}`) {
      const Component = components[currentComponent!];
      result.push(Component(buffer.join("")));
      buffer = [];
      currentComponent = null;
    } else if (currentComponent) {
      buffer.push(part);
    } else {
      result.push(part);
    }
  });

  return result;
}
