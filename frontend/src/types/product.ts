export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  team_id: string;
  author: string;
  status: "draft" | "active" | "deleted";
  created_at: Date;
}
