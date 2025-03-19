
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  BookOpen, 
  Video, 
  Download, 
  ClipboardList, 
  Printer, 
  BookMarked,
  Calendar
} from 'lucide-react';

const IndianEducatorResources: React.FC = () => {
  const resources = [
    {
      title: "Printable Worksheets Bundle",
      description: "Low-ink worksheets aligned with NCERT textbooks that can be printed for classroom use.",
      icon: <Printer className="h-10 w-10 text-purple-500" />,
      tags: ["NCERT Aligned", "Printable", "Low-ink"],
      downloadSize: "2.3 MB",
      type: "PDF Bundle"
    },
    {
      title: "Lesson Plan Templates",
      description: "Ready-to-use lesson plan templates aligned with NEP 2020 guidelines.",
      icon: <ClipboardList className="h-10 w-10 text-blue-500" />,
      tags: ["NEP 2020", "Editable", "Structured"],
      downloadSize: "1.5 MB",
      type: "Word Templates"
    },
    {
      title: "Classroom Activities Handbook",
      description: "100+ activities that use minimal resources but maximize learning outcomes.",
      icon: <BookMarked className="h-10 w-10 text-green-500" />,
      tags: ["Low-resource", "Interactive", "Group Activities"],
      downloadSize: "4.2 MB",
      type: "PDF Handbook"
    },
    {
      title: "Assessment Question Bank",
      description: "Thousands of questions organized by board, subject, chapter, and difficulty level.",
      icon: <FileText className="h-10 w-10 text-red-500" />,
      tags: ["CBSE", "ICSE", "State Boards", "All Subjects"],
      downloadSize: "3.7 MB",
      type: "Excel Database"
    },
    {
      title: "Virtual Field Trip Guides",
      description: "Guides for conducting virtual field trips to Indian historical and cultural sites.",
      icon: <Video className="h-10 w-10 text-yellow-500" />,
      tags: ["Cultural", "Interactive", "Visual Learning"],
      downloadSize: "2.8 MB",
      type: "Video + PDF Guide"
    },
    {
      title: "Academic Calendar Templates",
      description: "Customizable calendars with Indian holidays and academic milestone planning.",
      icon: <Calendar className="h-10 w-10 text-indigo-500" />,
      tags: ["Planning", "Customizable", "2023-2024"],
      downloadSize: "1.1 MB",
      type: "PDF + Excel"
    }
  ];

  return (
    <section className="py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Resources for Indian Educators</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Practical, culturally-relevant resources designed specifically for Indian classrooms and teaching contexts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                {resource.icon}
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{resource.title}</h3>
              <p className="text-gray-600 text-center mb-4">{resource.description}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {resource.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline" className="bg-gray-50">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-gray-500 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Download className="h-4 w-4" />
                  <span>{resource.downloadSize}</span>
                </div>
                <div>{resource.type}</div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-0 pb-6">
              <Button variant="outline" className="w-full">
                Download Resource
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
        <BookOpen className="h-12 w-12 mx-auto text-blue-600 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Professional Development Library</h3>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Access our complete library of teacher training materials, instructional videos, and professional development resources.
        </p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          Explore Teacher Library
        </Button>
      </div>
    </section>
  );
};

export default IndianEducatorResources;
