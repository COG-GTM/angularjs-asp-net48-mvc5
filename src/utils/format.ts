export function classNames(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

export function formatVersion(label: string, version: string): string {
  return `${label} Version: ${version}`;
}

export function externalLinkProps(openInNewTab: boolean) {
  return openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}
