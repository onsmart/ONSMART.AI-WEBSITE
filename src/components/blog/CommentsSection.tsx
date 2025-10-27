
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Heart, Reply, ThumbsUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

const CommentsSection = ({ postId }: { postId: string }) => {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Carlos Silva",
      email: "carlos@email.com",
      content: "Excelente artigo! Implementamos agentes de IA na nossa empresa recentemente e os resultados foram impressionantes. A produtividade aumentou 150% em apenas 3 meses.",
      date: "2024-01-14",
      likes: 12,
      replies: [
        {
          id: "1-1",
          author: "Maria Oliveira",
          email: "maria@email.com",
          content: "Carlos, que tipo de agentes vocês implementaram? Estamos considerando fazer o mesmo na nossa empresa.",
          date: "2024-01-14",
          likes: 3
        }
      ]
    },
    {
      id: "2",
      author: "Ana Costa",
      email: "ana@email.com",
      content: "Muito interessante a abordagem sobre ROI. Vocês têm algum case específico do setor financeiro que possam compartilhar?",
      date: "2024-01-13",
      likes: 8
    }
  ]);

  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: ''
  });
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.author || !newComment.email || !newComment.content) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      ...newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };

    setComments(prev => [comment, ...prev]);
    setNewComment({ author: '', email: '', content: '' });

    toast({
      title: "Comentário enviado!",
      description: "Seu comentário foi publicado com sucesso.",
    });
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: `${commentId}-${Date.now()}`,
      author: "Você",
      email: "your@email.com",
      content: replyContent,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));

    setReplyContent('');
    setReplyingTo(null);

    toast({
      title: "Resposta enviada!",
      description: "Sua resposta foi publicada com sucesso.",
    });
  };

  const handleLike = (commentId: string, isReply: boolean = false, parentId?: string) => {
    setComments(prev => prev.map(comment => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies?.map(reply => 
            reply.id === commentId 
              ? { ...reply, likes: reply.likes + 1 }
              : reply
          )
        };
      } else if (!isReply && comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    }));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Comentários ({comments.length})</h2>
      </div>

      {/* Comment Form */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Deixe seu comentário</h3>
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Seu nome"
              value={newComment.author}
              onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
              required
            />
            <Input
              type="email"
              placeholder="Seu email"
              value={newComment.email}
              onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <Textarea
            placeholder="Escreva seu comentário..."
            value={newComment.content}
            onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
            rows={4}
            required
          />
          <Button type="submit" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Enviar comentário
          </Button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback className="bg-primary text-white">
                  {getInitials(comment.author)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{comment.author}</h4>
                  <span className="text-sm text-muted-foreground">
                    {new Date(comment.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(comment.id)}
                    className="gap-1 text-muted-foreground hover:text-primary"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {comment.likes}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="gap-1 text-muted-foreground hover:text-primary"
                  >
                    <Reply className="h-4 w-4" />
                    Responder
                  </Button>
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Textarea
                      placeholder="Escreva sua resposta..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows={3}
                    />
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyContent.trim()}
                      >
                        Responder
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent('');
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="flex gap-4">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-secondary text-xs">
                            {getInitials(reply.author)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium text-sm">{reply.author}</h5>
                            <span className="text-xs text-muted-foreground">
                              {new Date(reply.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-700 dark:text-gray-300">{reply.content}</p>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(reply.id, true, comment.id)}
                            className="gap-1 text-muted-foreground hover:text-primary h-6 px-2"
                          >
                            <ThumbsUp className="h-3 w-3" />
                            {reply.likes}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum comentário ainda</h3>
          <p className="text-muted-foreground">Seja o primeiro a comentar neste artigo!</p>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
