
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCMSBlog } from '@/hooks/useCMSBlog';
import BlogList from './BlogList';
import BlogForm from './BlogForm';

const BlogManager = () => {
  const { posts, loading, createPost, updatePost, deletePost } = useCMSBlog();
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const handleCreate = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  const handleSave = async (data) => {
    let result;
    
    if (editingPost) {
      result = await updatePost(editingPost.id, data);
    } else {
      result = await createPost(data);
    }

    if (result.success) {
      handleCloseForm();
    }
    
    return result;
  };

  if (showForm) {
    return (
      <BlogForm
        post={editingPost}
        onSave={handleSave}
        onCancel={handleCloseForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Lista de Posts ({posts.length})</h3>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Post
        </Button>
      </div>

      <BlogList
        posts={posts}
        loading={loading}
        onEdit={handleEdit}
        onDelete={deletePost}
      />
    </div>
  );
};

export default BlogManager;
