import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Registration {
  id: number;
  name: string;
  email: string;
  institution: string;
  created_at: string;
}

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/2a8a49c4-e9f9-4ee0-8a82-f41aa8ccf169');
        const data = await response.json();
        setRegistrations(data.registrations);
        setMessages(data.messages);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Icon name="Loader2" className="animate-spin mx-auto text-primary" size={48} />
          <p className="text-muted-foreground">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="Shield" className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight">Панель администратора</h1>
              <p className="text-muted-foreground mt-2">Управление заявками и сообщениями</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Регистраций</CardTitle>
              <Icon name="UserPlus" className="text-muted-foreground" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registrations.length}</div>
              <p className="text-xs text-muted-foreground">Всего подписчиков</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Сообщений</CardTitle>
              <Icon name="MessageSquare" className="text-muted-foreground" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{messages.length}</div>
              <p className="text-xs text-muted-foreground">Полученных сообщений</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего заявок</CardTitle>
              <Icon name="FileText" className="text-muted-foreground" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registrations.length + messages.length}</div>
              <p className="text-xs text-muted-foreground">Общее количество</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="registrations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="registrations">
              <Icon name="UserPlus" size={16} className="mr-2" />
              Регистрации ({registrations.length})
            </TabsTrigger>
            <TabsTrigger value="messages">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Сообщения ({messages.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="registrations" className="space-y-4">
            {registrations.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center space-y-3">
                    <Icon name="Inbox" className="mx-auto text-muted-foreground" size={48} />
                    <p className="text-muted-foreground">Пока нет регистраций</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              registrations.map((reg) => (
                <Card key={reg.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{reg.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Icon name="Mail" size={14} />
                          {reg.email}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{formatDate(reg.created_at)}</Badge>
                    </div>
                  </CardHeader>
                  {reg.institution && (
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Building" size={14} />
                        {reg.institution}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            {messages.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center space-y-3">
                    <Icon name="Inbox" className="mx-auto text-muted-foreground" size={48} />
                    <p className="text-muted-foreground">Пока нет сообщений</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              messages.map((msg) => (
                <Card key={msg.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{msg.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Icon name="Mail" size={14} />
                          {msg.email}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{formatDate(msg.created_at)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Icon name="MessageCircle" size={14} />
                        Сообщение:
                      </div>
                      <p className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
                        {msg.message}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
