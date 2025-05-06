
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContentEditor from '@/components/content/ContentEditor';
import MainLayout from '@/components/layout/MainLayout';

const ContentCreationPage = () => {
  const navigate = useNavigate();
  
  const handleSave = async (data: any) => {
    console.log('Saving content:', data);
    // Here we would normally save the content to the backend
    // For now, we'll just simulate a delay and then navigate back
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        navigate('/dashboard');
      }, 1000);
    });
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Powrót
          </Button>
          <h1 className="text-3xl font-bold">Nowa treść</h1>
        </div>
        
        <ContentEditor onSave={handleSave} />
      </div>
    </MainLayout>
  );
};

export default ContentCreationPage;
