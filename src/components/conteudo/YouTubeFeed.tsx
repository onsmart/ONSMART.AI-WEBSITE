import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, ExternalLink, Calendar, Eye, Clock, Filter, X } from "lucide-react";

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    channelTitle: string;
  };
  contentDetails?: {
    duration: string;
  };
}

export default function YouTubeFeed() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [allVideos, setAllVideos] = useState<YouTubeVideo[]>([]);
  const [recentVideos, setRecentVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("recent");
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_HANDLE = "@onsmarttech";

  // Função para converter duração ISO 8601 para segundos
  const parseDuration = (duration: string): number => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    
    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');
    
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Função para identificar se um vídeo é shorts
  const isShortsVideo = (video: YouTubeVideo): boolean => {
    const title = video.snippet.title.toLowerCase();
    const description = video.snippet.description.toLowerCase();
    
    // Verificar duração (shorts são geralmente < 60 segundos)
    if (video.contentDetails?.duration) {
      const durationInSeconds = parseDuration(video.contentDetails.duration);
      if (durationInSeconds < 60) {
        console.log(`Vídeo identificado como shorts por duração (${durationInSeconds}s):`, video.snippet.title);
        return true;
      }
    }
    
    // Verificar palavras-chave no título e descrição
    const shortsKeywords = [
      'shorts', 'short', '#shorts', '#short', 'shorts', 'short',
      'youtube shorts', 'yt shorts', 'shorts video', 'short video'
    ];
    
    for (const keyword of shortsKeywords) {
      if (title.includes(keyword) || description.includes(keyword)) {
        console.log(`Vídeo identificado como shorts por palavra-chave "${keyword}":`, video.snippet.title);
        return true;
      }
    }
    
    // Verificar padrões regex
    if (title.match(/shorts/i) || description.match(/shorts/i)) {
      console.log(`Vídeo identificado como shorts por regex:`, video.snippet.title);
      return true;
    }
    
    return false;
  };

  // Lista de vídeos de fallback quando a API não estiver disponível
  const fallbackVideos: YouTubeVideo[] = [
    {
      id: { videoId: "F2wkF4KZz2Y" },
      snippet: {
        title: "OnSmart AI - Vídeo Oficial",
        description: "Conteúdo oficial da OnSmart AI sobre inteligência artificial e transformação digital.",
        publishedAt: new Date().toISOString(),
        thumbnails: {
          medium: {
            url: "https://img.youtube.com/vi/F2wkF4KZz2Y/mqdefault.jpg"
          }
        },
        channelTitle: "OnSmart Tech"
      },
      contentDetails: {
        duration: "PT3M33S"
      }
    },
    {
      id: { videoId: "dQw4w9WgXcQ" },
      snippet: {
        title: "OnSmart AI - Inteligência Artificial para Empresas",
        description: "Descubra como a OnSmart AI pode transformar sua empresa com soluções de inteligência artificial personalizadas.",
        publishedAt: "2024-01-15T10:00:00Z",
        thumbnails: {
          medium: {
            url: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg"
          }
        },
        channelTitle: "OnSmart Tech"
      },
      contentDetails: {
        duration: "PT3M33S"
      }
    },
    {
      id: { videoId: "jNQXAC9IVRw" },
      snippet: {
        title: "Vibe Enterprise - Plataforma de Gestão Inteligente",
        description: "Conheça a Vibe Enterprise, nossa plataforma completa de gestão empresarial com IA integrada.",
        publishedAt: "2024-01-10T14:30:00Z",
        thumbnails: {
          medium: {
            url: "https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg"
          }
        },
        channelTitle: "OnSmart Tech"
      },
      contentDetails: {
        duration: "PT4M15S"
      }
    }
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        
        // Primeiro, buscar o Channel ID usando o handle
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&forUsername=onsmarttech&part=id`
        );
        
        let channelId = "UC7IkX4S0ixK0QBSdW8rDaXQ"; // fallback
        
        if (channelResponse.ok) {
          const channelData = await channelResponse.json();
          if (channelData.items && channelData.items.length > 0) {
            channelId = channelData.items[0].id;
            console.log('Channel ID encontrado:', channelId);
          }
        } else if (channelResponse.status === 403) {
          console.warn('⚠️ Quota da API excedida, usando vídeos de fallback');
          setVideos(fallbackVideos);
          setAllVideos(fallbackVideos);
          setRecentVideos(fallbackVideos.slice(0, 5));
          setLoading(false);
          return;
        }
        
        // Buscar os vídeos usando o Channel ID
        const searchResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&order=date&part=snippet&type=video&maxResults=50`
        );
        
        if (!searchResponse.ok) {
          if (searchResponse.status === 403) {
            console.warn('⚠️ Quota da API excedida, usando vídeos de fallback');
            setVideos(fallbackVideos);
            setAllVideos(fallbackVideos);
            setRecentVideos(fallbackVideos.slice(0, 5));
            setLoading(false);
            return;
          }
          throw new Error('Falha ao buscar vídeos');
        }
        
        const searchData = await searchResponse.json();
        
        // Buscar detalhes dos vídeos (incluindo duração)
        const videoIds = searchData.items.map((video: any) => video.id.videoId).join(',');
        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=contentDetails&id=${videoIds}`
        );
        
        if (!detailsResponse.ok) {
          throw new Error('Falha ao buscar detalhes dos vídeos');
        }
        
        const detailsData = await detailsResponse.json();
        
        // Combinar dados de busca com detalhes
        const videosWithDetails = searchData.items.map((video: any) => {
          const details = detailsData.items.find((detail: any) => detail.id === video.id.videoId);
          return {
            ...video,
            contentDetails: details?.contentDetails
          };
        });
        
        const data = { items: videosWithDetails };
        
        console.log('Total de vídeos recebidos:', data.items.length);
        
        // Log de todos os vídeos para debug
        console.log('Todos os vídeos com detalhes:', data.items.map(v => ({
          title: v.snippet.title,
          description: v.snippet.description.substring(0, 100),
          duration: v.contentDetails?.duration,
          durationInSeconds: v.contentDetails?.duration ? parseDuration(v.contentDetails.duration) : 'N/A'
        })));
        
        // Filtrar vídeos que contêm "Vibe Enterprise" ou "onsmart.AI" no título e excluir shorts
        const filteredVideos = data.items.filter((video: YouTubeVideo) => {
          const title = video.snippet.title.toLowerCase();
          
          // Excluir vídeos shorts
          if (isShortsVideo(video)) {
            return false;
          }
          
          // Apenas vídeos com "Vibe Enterprise" ou "onsmart.AI" no título
          const isValidVideo = title.includes('vibe enterprise') || title.includes('onsmart.ai');
          
          if (isValidVideo) {
            console.log('Vídeo válido encontrado:', video.snippet.title);
          }
          
          return isValidVideo;
        });
        
        console.log('Vídeos filtrados:', filteredVideos.length);
        console.log('Títulos dos vídeos filtrados:', filteredVideos.map(v => v.snippet.title));
        
        // Log detalhado do processo de filtragem
        let excludedByShorts = 0;
        let included = 0;
        
        data.items.forEach((video: YouTubeVideo) => {
          if (isShortsVideo(video)) {
            excludedByShorts++;
            return;
          }
          
          const title = video.snippet.title.toLowerCase();
          const isValidVideo = title.includes('vibe enterprise') || title.includes('onsmart.ai');
          if (isValidVideo) {
            included++;
          }
        });
        
        console.log(`Filtragem: ${excludedByShorts} excluídos por serem shorts, ${included} incluídos`);
        
        setVideos(filteredVideos);
        setAllVideos(data.items); // Todos os vídeos sem filtro
        
        // Separar vídeos recentes (últimos 5)
        const recent = filteredVideos.slice(0, 5);
        setRecentVideos(recent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        console.error('Erro ao buscar vídeos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openVideoModal = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-1">
        <div className="flex space-x-1">
          <div className="w-0.5 h-0.5 bg-brand-blue rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-0.5 h-0.5 bg-brand-blue rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-0.5 h-0.5 bg-brand-blue rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-red-500">Erro ao carregar vídeos</p>
      </div>
    );
  }

  const renderVideos = (videoList: YouTubeVideo[]) => {
    if (videoList.length === 0) {
      return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-500">Nenhum vídeo encontrado</p>
      </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoList.map((video) => (
          <Card key={video.id.videoId} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-48 object-cover"
              />
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-sm line-clamp-2">
                {video.snippet.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                {video.snippet.description}
              </p>
              
              {/* Exibir duração do vídeo */}
              {video.contentDetails?.duration && (
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {Math.floor(parseDuration(video.contentDetails.duration) / 60)}:
                    {String(parseDuration(video.contentDetails.duration) % 60).padStart(2, '0')}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-center gap-3 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs px-4 py-2"
                  onClick={() => openVideoModal(video)}
                >
                  <Play className="h-3 w-3 mr-1" />
                  Assistir
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs px-4 py-2"
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  YouTube
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center py-1">
        <div className="flex space-x-1">
          <div className="w-0.5 h-0.5 bg-brand-blue rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-0.5 h-0.5 bg-brand-blue rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-0.5 h-0.5 bg-brand-blue rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-red-500">Erro ao carregar vídeos</p>
      </div>
    );
  }

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Vídeos Recentes
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Todos os Vídeos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent">
          {renderVideos(recentVideos)}
        </TabsContent>
        
        <TabsContent value="all">
          {renderVideos(videos)}
        </TabsContent>
      </Tabs>

      {/* Modal de Vídeo */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl w-[90vw] h-[80vh] p-0">
                  <DialogHeader className="p-4 pb-2">
          <DialogTitle className="text-lg font-semibold">
            {selectedVideo?.snippet.title}
          </DialogTitle>
        </DialogHeader>
          
          {selectedVideo && (
            <div className="flex-1 p-4 pt-0">
              <div className="relative w-full h-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1`}
                  title={selectedVideo.snippet.title}
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">{selectedVideo.snippet.title}</h3>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {selectedVideo.snippet.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 