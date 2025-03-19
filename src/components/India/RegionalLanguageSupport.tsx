
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Languages, 
  Volume2, 
  MessageSquare, 
  BookOpen, 
  Mic, 
  Headphones,
  Globe
} from 'lucide-react';
import BuddyBot from '@/components/Buddy/BuddyBot';

const RegionalLanguageSupport: React.FC = () => {
  const [activeDemoLang, setActiveDemoLang] = useState('hindi');

  const languages = [
    { id: 'hindi', name: 'Hindi', speakers: '600M+', coverage: '100%' },
    { id: 'tamil', name: 'Tamil', speakers: '70M+', coverage: '100%' },
    { id: 'telugu', name: 'Telugu', speakers: '85M+', coverage: '100%' },
    { id: 'marathi', name: 'Marathi', speakers: '95M+', coverage: '100%' },
    { id: 'bengali', name: 'Bengali', speakers: '100M+', coverage: '100%' },
    { id: 'kannada', name: 'Kannada', speakers: '55M+', coverage: '100%' },
    { id: 'malayalam', name: 'Malayalam', speakers: '45M+', coverage: '100%' },
    { id: 'gujarati', name: 'Gujarati', speakers: '60M+', coverage: '100%' },
    { id: 'punjabi', name: 'Punjabi', speakers: '35M+', coverage: '90%' },
    { id: 'urdu', name: 'Urdu', speakers: '55M+', coverage: '90%' },
    { id: 'odia', name: 'Odia', speakers: '40M+', coverage: '90%' },
    { id: 'more', name: '10+ More', speakers: '100M+', coverage: '80%' },
  ];

  // Define the demo conversations for different languages
  const demoConversations: Record<string, Array<{role: string, text: string}>> = {
    hindi: [
      { role: 'buddy', text: 'नमस्ते! क्या आप गणित का अभ्यास करना चाहते हैं?' },
      { role: 'user', text: 'हां, मुझे कक्षा 3 के भिन्न (fractions) समझने में मदद चाहिए।' },
      { role: 'buddy', text: 'बिलकुल! भिन्न एक संख्या का हिस्सा होता है। जैसे, अगर एक पिज्जा 8 टुकड़ों में कटा है और आप 3 टुकड़े खाते हैं, तो आपने 3/8 पिज्जा खाया।' },
      { role: 'user', text: 'अच्छा, और अगर मैं आधा पिज्जा खाऊं तो?' },
      { role: 'buddy', text: 'अगर आप आधा पिज्जा खाते हैं, तो आप 4/8 या सरलीकरण करके 1/2 पिज्जा खाते हैं! क्या आप अभ्यास के लिए कुछ प्रश्न हल करना चाहेंगे?' }
    ],
    tamil: [
      { role: 'buddy', text: 'வணக்கம்! நீங்கள் கணிதம் பயிற்சி செய்ய விரும்புகிறீர்களா?' },
      { role: 'user', text: 'ஆம், எனக்கு 3ம் வகுப்பு பின்னங்களைப் புரிந்துகொள்ள உதவி தேவை.' },
      { role: 'buddy', text: 'கண்டிப்பாக! ஒரு பின்னம் என்பது ஒரு எண்ணின் பகுதியாகும். உதாரணமாக, ஒரு பீட்சா 8 துண்டுகளாக வெட்டப்பட்டு நீங்கள் 3 துண்டுகளை சாப்பிட்டால், நீங்கள் 3/8 பீட்சா சாப்பிட்டீர்கள்.' },
      { role: 'user', text: 'சரி, நான் பாதி பீட்சா சாப்பிட்டால் என்ன?' },
      { role: 'buddy', text: 'நீங்கள் பாதி பீட்சா சாப்பிட்டால், நீங்கள் 4/8 அல்லது சுருக்கி 1/2 பீட்சா சாப்பிடுகிறீர்கள்! பயிற்சிக்கு சில கேள்விகளைத் தீர்க்க விரும்புகிறீர்களா?' }
    ],
    english: [
      { role: 'buddy', text: 'Hello! Would you like to practice math?' },
      { role: 'user', text: 'Yes, I need help understanding fractions for Class 3.' },
      { role: 'buddy', text: 'Absolutely! A fraction is a part of a number. For example, if a pizza is cut into 8 pieces and you eat 3 pieces, you\'ve eaten 3/8 of the pizza.' },
      { role: 'user', text: 'Okay, and if I eat half a pizza?' },
      { role: 'buddy', text: 'If you eat half a pizza, you\'re eating 4/8 or simplified to 1/2 of the pizza! Would you like to solve some practice questions?' }
    ]
  };

  return (
    <section className="py-10">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <Languages className="h-16 w-16 text-lovable-purple" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Regional Language Support</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our platform speaks your language with full support for 12+ Indian languages,
          making learning accessible to every child across India.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
        <div className="lg:col-span-2 bg-gray-50 rounded-xl p-6 border border-gray-100">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            Supported Languages
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {languages.map(lang => (
              <Card 
                key={lang.id} 
                className={`border cursor-pointer hover:border-blue-300 transition-colors ${
                  activeDemoLang === lang.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setActiveDemoLang(lang.id === 'more' ? 'hindi' : lang.id)}
              >
                <CardContent className="p-3 text-center">
                  <div className="font-bold">{lang.name}</div>
                  <div className="text-xs text-gray-500">{lang.speakers}</div>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {lang.coverage}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="voicebuddy" className="w-full">
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="voicebuddy" className="text-center">
                <div className="flex flex-col items-center gap-1">
                  <Mic className="h-4 w-4" />
                  <span>Voice Buddy</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="content" className="text-center">
                <div className="flex flex-col items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>Content</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="parent" className="text-center">
                <div className="flex flex-col items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Parent Updates</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="voicebuddy">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Voice Buddy Demo</h3>
                  <p className="text-gray-600 mb-6">
                    See how our AI Buddy can converse naturally in {
                      activeDemoLang === 'hindi' 
                        ? 'Hindi' 
                        : activeDemoLang === 'tamil' 
                          ? 'Tamil' 
                          : 'English'
                    }.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm font-medium text-gray-500">
                        Conversation in {
                          activeDemoLang === 'hindi' 
                            ? 'Hindi' 
                            : activeDemoLang === 'tamil' 
                              ? 'Tamil' 
                              : 'English'
                        }
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Volume2 className="h-3 w-3" />
                        <span>Voice Enabled</span>
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      {(demoConversations[activeDemoLang as keyof typeof demoConversations] || demoConversations.english).map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'buddy' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[80%] ${
                            message.role === 'buddy' 
                              ? 'bg-white' 
                              : 'bg-blue-500 text-white'
                          } rounded-lg p-3 shadow-sm`}>
                            {message.role === 'buddy' && (
                              <div className="flex items-center gap-2 mb-2">
                                <BuddyBot size="sm" expression="happy" /> 
                                <span className="font-bold">Buddy</span>
                              </div>
                            )}
                            <p>{message.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Headphones className="h-4 w-4" />
                      <span>Try speaking in different languages</span>
                    </div>
                    <Button size="sm" className="flex items-center gap-1">
                      <Mic className="h-4 w-4" />
                      <span>Try Voice Input</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Multilingual Content</h3>
                  <p className="text-gray-600 mb-6">
                    All educational content is available in multiple languages with seamless switching.
                  </p>
                  
                  <div className="rounded-lg border overflow-hidden mb-6">
                    <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                      <div className="font-medium">Math Lesson: Fractions</div>
                      <div className="flex items-center gap-2">
                        <Languages className="h-4 w-4 text-gray-500" />
                        <select className="text-sm border rounded px-2 py-1">
                          <option value="english">English</option>
                          <option value="hindi" selected={activeDemoLang === 'hindi'}>Hindi</option>
                          <option value="tamil" selected={activeDemoLang === 'tamil'}>Tamil</option>
                          <option>+ 9 more</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center">
                          <Video className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <span className="text-sm text-gray-500">Interactive video in {
                            activeDemoLang === 'hindi' 
                              ? 'Hindi' 
                              : activeDemoLang === 'tamil' 
                                ? 'Tamil' 
                                : 'English'
                          }</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-lg mb-2">
                        {activeDemoLang === 'hindi' 
                          ? 'भिन्न: संख्याओं के हिस्से समझना' 
                          : activeDemoLang === 'tamil' 
                            ? 'பின்னங்கள்: எண்களின் பகுதிகளைப் புரிந்துகொள்ளுதல்' 
                            : 'Fractions: Understanding Parts of Numbers'}
                      </h4>
                      <p className="text-gray-600 mb-4">
                        {activeDemoLang === 'hindi' 
                          ? 'भिन्न संख्याओं के हिस्से हैं। जब हम किसी चीज को समान भागों में बांटते हैं, तो हम भिन्न का उपयोग करते हैं।' 
                          : activeDemoLang === 'tamil' 
                            ? 'பின்னங்கள் எண்களின் பகுதிகளாகும். நாம் பொருட்களை சம பகுதிகளாகப் பிரிக்கும்போது, நாம் பின்னங்களைப் பயன்படுத்துகிறோம்.' 
                            : 'Fractions are parts of numbers. When we divide things into equal parts, we use fractions.'}
                      </p>
                      <div className="flex justify-end">
                        <Button>
                          {activeDemoLang === 'hindi' 
                            ? 'पाठ जारी रखें' 
                            : activeDemoLang === 'tamil' 
                              ? 'பாடத்தைத் தொடரவும்' 
                              : 'Continue Lesson'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="parent">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Parent Communications</h3>
                  <p className="text-gray-600 mb-6">
                    Parents receive updates in their preferred language via WhatsApp or the app.
                  </p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-60 h-96 bg-gray-100 rounded-2xl border-8 border-gray-800 overflow-hidden shadow-lg">
                      <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 rounded-t-lg"></div>
                      <div className="h-full pt-6 bg-gray-50">
                        <div className="bg-green-100 p-3">
                          <div className="text-sm font-bold text-center text-green-800">WhatsApp</div>
                        </div>
                        <div className="p-3">
                          <div className="rounded-lg bg-white p-3 shadow-sm mb-3">
                            <div className="text-xs text-gray-500 mb-1">Lovable Learning</div>
                            <p className="text-sm">
                              {activeDemoLang === 'hindi' 
                                ? 'नमस्ते राजेश जी! अनुराग ने आज गणित में 85% अंक प्राप्त किए। आप उसकी प्रगति रिपोर्ट देखने के लिए यहां क्लिक करें।' 
                                : activeDemoLang === 'tamil' 
                                  ? 'வணக்கம் ராஜேஷ்! அனுராக் இன்று கணிதத்தில் 85% மதிப்பெண்கள் பெற்றார். அவரது முன்னேற்ற அறிக்கையைப் பார்க்க இங்கே கிளிக் செய்யவும்.' 
                                  : 'Hello Rajesh! Anurag scored 85% in Math today. Click here to view his progress report.'}
                            </p>
                            <div className="bg-blue-50 text-blue-500 text-xs text-center rounded p-1 mt-2">
                              View Report
                            </div>
                          </div>
                          <div className="rounded-lg bg-white p-3 shadow-sm">
                            <div className="text-xs text-gray-500 mb-1">Lovable Learning</div>
                            <p className="text-sm">
                              {activeDemoLang === 'hindi' 
                                ? 'आज का फैमिली क्वेस्ट: "विज्ञान प्रयोग" अनुराग के साथ कीजिए। 20 मिनट का यह गतिविधि उसकी प्राकृतिक विज्ञान की समझ बढ़ाएगी।' 
                                : activeDemoLang === 'tamil' 
                                  ? 'இன்றைய குடும்ப விளக்கம்: அனுராகுடன் "அறிவியல் பரிசோதனை" செய்யுங்கள். 20 நிமிட செயல்பாடு அவரது இயற்கை அறிவியல் புரிதலை மேம்படுத்தும்.' 
                                  : 'Today\'s Family Quest: Do a "Science Experiment" with Anurag. This 20-minute activity will enhance his understanding of natural science.'}
                            </p>
                            <div className="bg-blue-50 text-blue-500 text-xs text-center rounded p-1 mt-2">
                              Start Family Quest
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Parent Communication Features</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">WhatsApp Integration</div>
                            <p className="text-sm text-gray-600">
                              Updates delivered directly to parents' preferred messaging platform
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">12+ Language Support</div>
                            <p className="text-sm text-gray-600">
                              All parent communications available in major Indian languages
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">Progress Reports</div>
                            <p className="text-sm text-gray-600">
                              Weekly summaries of child's learning progress and achievements
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">Family Activities</div>
                            <p className="text-sm text-gray-600">
                              Suggestions for offline learning activities to do together
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

// Add missing CheckCircle and Video components
const CheckCircle = (props: React.ComponentProps<typeof Languages>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
};

const Video = (props: React.ComponentProps<typeof Languages>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z"></path>
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
    </svg>
  );
};

export default RegionalLanguageSupport;
