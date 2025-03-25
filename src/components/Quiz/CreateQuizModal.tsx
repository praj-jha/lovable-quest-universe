
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';

// Schema for quiz creation
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  gradeLevel: z.coerce.number().min(1, "Grade level is required"),
  timeLimit: z.coerce.number().min(1, "Time limit is required"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  passingScore: z.coerce.number().min(1).max(100, "Passing score must be between 1-100"),
  questions: z.array(
    z.object({
      question: z.string().min(5, "Question must be at least 5 characters"),
      options: z.array(z.string().min(1, "Option cannot be empty")).min(2, "At least 2 options are required"),
      correctAnswer: z.number().min(0, "Please select a correct answer"),
      timeLimit: z.coerce.number().min(10, "Time limit must be at least 10 seconds"),
      points: z.coerce.number().min(1, "Points must be at least 1")
    })
  ).min(1, "At least one question is required")
});

type QuizFormValues = z.infer<typeof formSchema>;

interface CreateQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuizCreated: () => void;
}

const defaultQuestion = {
  question: "",
  options: ["", ""],
  correctAnswer: 0,
  timeLimit: 30,
  points: 10
};

const CreateQuizModal: React.FC<CreateQuizModalProps> = ({ 
  isOpen, 
  onClose,
  onQuizCreated
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      subject: "",
      gradeLevel: 6,
      timeLimit: 10,
      difficulty: "beginner",
      passingScore: 60,
      questions: [defaultQuestion]
    }
  });

  const { fields, append, remove } = form.control._formValues.questions;

  const addQuestion = () => {
    form.setValue('questions', [
      ...form.getValues('questions'),
      defaultQuestion
    ]);
  };

  const removeQuestion = (index: number) => {
    const currentQuestions = form.getValues('questions');
    if (currentQuestions.length > 1) {
      form.setValue('questions', 
        currentQuestions.filter((_, i) => i !== index)
      );
    } else {
      toast({
        title: "Cannot Remove",
        description: "Quiz must have at least one question",
        variant: "destructive"
      });
    }
  };

  const addOption = (questionIndex: number) => {
    const currentQuestions = form.getValues('questions');
    const updatedQuestions = [...currentQuestions];
    updatedQuestions[questionIndex].options.push("");
    form.setValue('questions', updatedQuestions);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const currentQuestions = form.getValues('questions');
    const currentOptions = currentQuestions[questionIndex].options;
    
    if (currentOptions.length > 2) {
      const updatedQuestions = [...currentQuestions];
      updatedQuestions[questionIndex].options = currentOptions.filter((_, i) => i !== optionIndex);
      
      // If removing correct answer, reset it to first option
      if (currentQuestions[questionIndex].correctAnswer === optionIndex) {
        updatedQuestions[questionIndex].correctAnswer = 0;
      } else if (currentQuestions[questionIndex].correctAnswer > optionIndex) {
        // Adjust correct answer index if removing option before it
        updatedQuestions[questionIndex].correctAnswer -= 1;
      }
      
      form.setValue('questions', updatedQuestions);
    } else {
      toast({
        title: "Cannot Remove",
        description: "Question must have at least two options",
        variant: "destructive"
      });
    }
  };

  const onSubmit = async (data: QuizFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Make API call to create quiz
      const response = await api.post('/quizzes', data);
      
      if (response.data.success) {
        onQuizCreated();
        form.reset();
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to create quiz",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create quiz",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Quiz</DialogTitle>
          <DialogDescription>
            Create a new quiz for your students. Add questions, options, and set the correct answers.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter quiz title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter quiz description" 
                      {...field} 
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="gradeLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade Level</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={12} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="timeLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Limit (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="passingScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passing Score (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={100} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <FormControl>
                    <Select 
                      defaultValue={field.value} 
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Questions</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={addQuestion}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Question
                </Button>
              </div>
              
              {form.getValues('questions').map((question, questionIndex) => (
                <div 
                  key={questionIndex} 
                  className="border rounded-lg p-4 mb-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Question {questionIndex + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(questionIndex)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name={`questions.${questionIndex}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question Text</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter your question" 
                              {...field} 
                              rows={2}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`questions.${questionIndex}.points`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Points</FormLabel>
                            <FormControl>
                              <Input type="number" min={1} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`questions.${questionIndex}.timeLimit`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time Limit (seconds)</FormLabel>
                            <FormControl>
                              <Input type="number" min={10} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <FormLabel>Answer Options</FormLabel>
                      <div className="space-y-2 mt-2">
                        {question.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex} 
                            className="flex items-center gap-2"
                          >
                            <FormField
                              control={form.control}
                              name={`questions.${questionIndex}.correctAnswer`}
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <input
                                      type="radio"
                                      checked={field.value === optionIndex}
                                      onChange={() => field.onChange(optionIndex)}
                                      className="h-4 w-4 text-primary"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name={`questions.${questionIndex}.options.${optionIndex}`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input placeholder={`Option ${optionIndex + 1}`} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeOption(questionIndex, optionIndex)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => addOption(questionIndex)}
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Quiz"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuizModal;
