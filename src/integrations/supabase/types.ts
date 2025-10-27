// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      cms_content: {
        Row: {
          id: string;
          title: string;
          content: string;
          type: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          type: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          type?: string;
          status?: string;
          updated_at?: string;
        };
      };
      cms_cases: {
        Row: {
          id: string;
          title: string;
          description: string;
          sector: string;
          results: any;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          sector: string;
          results?: any;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          sector?: string;
          results?: any;
          status?: string;
          updated_at?: string;
        };
      };
      cms_blog: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string;
          slug: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt: string;
          slug: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string;
          slug?: string;
          status?: string;
          updated_at?: string;
        };
      };
      whatsapp_agents: {
        Row: {
          id: string;
          name: string;
          phone: string;
          status: string;
          config: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          status?: string;
          config?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          status?: string;
          config?: any;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
