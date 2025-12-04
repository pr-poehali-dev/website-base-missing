import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { publications } from '@/data/publications';
import Header from '@/components/Header';

const categoryGroups = {
  'Наука': ['Статьи', 'Монографии', 'Учебники'],
  'Литература': ['Публицистика', 'Проза'],
  'Интервью': ['Публикации', 'Видео', 'Доклады'],
  'Новости': []
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Новости');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', institution: '' });
  const [messageForm, setMessageForm] = useState({ name: '', email: '', message: '' });
  const { toast } = useToast();

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pub.journal.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGroup = categoryGroups[selectedGroup as keyof typeof categoryGroups].includes(pub.category);
    const matchesCategory = !selectedCategory || pub.category === selectedCategory;

    return matchesSearch && matchesGroup && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-8">
          <Tabs defaultValue="Новости" onValueChange={(value) => {
            setSelectedGroup(value);
            setSelectedCategory(null);
          }}>
            <TabsList className="h-auto p-1 bg-secondary/50 flex-wrap justify-start mb-6">
              {Object.keys(categoryGroups).map((group) => (
                <TabsTrigger
                  key={group}
                  value={group}
                  className="text-sm px-6 py-2.5"
                >
                  {group}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="relative max-w-2xl">
            <Icon
              name="Search"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              type="search"
              placeholder="Поиск по публикациям, тегам, журналам..."
              className="pl-12 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12">
        <section className="mb-16">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-semibold mb-6 leading-tight">
              Научные публикации и исследования
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Коллекция научных работ, статей и монографий, посвящённых вопросам
              философии, методологии и теории познания.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">Последние новости</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {publications
              .filter(pub => pub.category === 'Новости')
              .slice(0, 3)
              .map((pub) => (
                <Link key={pub.id} to={`/publication/${pub.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{pub.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {pub.journal} • {pub.year}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {pub.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </section>

        <Tabs value={selectedGroup} className="mb-12">
          {Object.keys(categoryGroups).map((group) => (
            <TabsContent key={group} value={group} className="mt-0">
              {group !== 'Новости' && (
                <div className="mb-6 flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs"
                  >
                    Все
                  </Button>
                  {categoryGroups[group as keyof typeof categoryGroups].map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              )}
              <div className="grid gap-6 animate-fade-in">
                {filteredPublications.length === 0 ? (
                  <div className="text-center py-16">
                    <Icon
                      name="FileSearch"
                      className="mx-auto mb-4 text-muted-foreground"
                      size={48}
                    />
                    <p className="text-lg text-muted-foreground">
                      Публикации не найдены
                    </p>
                  </div>
                ) : (
                  filteredPublications.map((pub, index) => (
                    <Card
                      key={pub.id}
                      className="group hover:shadow-lg transition-all duration-300 animate-scale-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardHeader className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <Badge variant="secondary" className="text-xs font-medium">
                              {pub.category}
                            </Badge>
                            <CardTitle className="text-2xl leading-tight group-hover:text-primary transition-colors">
                              {pub.title}
                            </CardTitle>
                          </div>
                          <span className="text-sm text-muted-foreground font-medium">
                            {pub.year}
                          </span>
                        </div>
                        <CardDescription className="text-sm text-muted-foreground italic">
                          {pub.journal}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-base leading-relaxed">{pub.excerpt}</p>
                        <div className="flex flex-wrap gap-2">
                          {pub.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs font-normal"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Link to={`/publication/${pub.id}`}>
                          <Button
                            variant="ghost"
                            className="group/btn p-0 h-auto hover:bg-transparent"
                          >
                            <span className="text-primary flex items-center gap-2">
                              Читать полностью
                              <Icon
                                name="ArrowRight"
                                size={16}
                                className="group-hover/btn:translate-x-1 transition-transform"
                              />
                            </span>
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <section className="mt-20 pt-16 border-t border-border">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="BookOpen" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold">50+ публикаций</h3>
              <p className="text-muted-foreground">
                В ведущих научных журналах и издательствах
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Award" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Рецензирование</h3>
              <p className="text-muted-foreground">
                Все работы прошли строгую научную экспертизу
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="TrendingUp" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Индексация</h3>
              <p className="text-muted-foreground">
                Включены в международные научные базы данных
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 pt-16 border-t border-border">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="UserPlus" className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl font-semibold">Регистрация</h3>
                <p className="text-muted-foreground">
                  Зарегистрируйтесь, чтобы получать уведомления о новых публикациях
                </p>
              </div>
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const response = await fetch('https://functions.poehali.dev/46a0bc9c-e46d-4726-9467-7b0c71931d79', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(registerForm)
                    });
                    const data = await response.json();
                    if (data.success) {
                      toast({
                        title: "Регистрация успешна!",
                        description: "Мы отправим вам уведомление о новых публикациях.",
                      });
                      setRegisterForm({ name: '', email: '', institution: '' });
                    }
                  } catch (error) {
                    toast({
                      title: "Ошибка",
                      description: "Не удалось отправить регистрацию. Попробуйте позже.",
                      variant: "destructive"
                    });
                  }
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Имя и фамилия</Label>
                  <Input
                    id="reg-name"
                    placeholder="Иван Иванов"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="ivan@example.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-institution">Организация (необязательно)</Label>
                  <Input
                    id="reg-institution"
                    placeholder="МГУ им. Ломоносова"
                    value={registerForm.institution}
                    onChange={(e) => setRegisterForm({ ...registerForm, institution: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Icon name="Send" size={16} className="mr-2" />
                  Зарегистрироваться
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="MessageSquare" className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl font-semibold">Оставить сообщение</h3>
                <p className="text-muted-foreground">
                  Есть вопросы или предложения? Напишите нам
                </p>
              </div>
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const response = await fetch('https://functions.poehali.dev/487ceefe-4ba6-45bc-9f5a-9db68a3cd89d', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(messageForm)
                    });
                    const data = await response.json();
                    if (data.success) {
                      toast({
                        title: "Сообщение отправлено!",
                        description: "Мы свяжемся с вами в ближайшее время.",
                      });
                      setMessageForm({ name: '', email: '', message: '' });
                    }
                  } catch (error) {
                    toast({
                      title: "Ошибка",
                      description: "Не удалось отправить сообщение. Попробуйте позже.",
                      variant: "destructive"
                    });
                  }
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="msg-name">Имя</Label>
                  <Input
                    id="msg-name"
                    placeholder="Ваше имя"
                    value={messageForm.name}
                    onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="msg-email">Email</Label>
                  <Input
                    id="msg-email"
                    type="email"
                    placeholder="ваш@email.com"
                    value={messageForm.email}
                    onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="msg-message">Сообщение</Label>
                  <Textarea
                    id="msg-message"
                    placeholder="Ваше сообщение..."
                    rows={4}
                    value={messageForm.message}
                    onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить сообщение
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Научные публикации. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;