export interface StaticPageModel {
  pageId: number;
  title: string;
  slug: string;
  content: string;
  isActive?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  updatedBy?: number | null;
}
