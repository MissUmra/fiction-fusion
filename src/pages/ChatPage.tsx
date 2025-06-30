import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, MoreVertical } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { getCharacterAvatar } from '../utils/colors';
import { darkTheme } from '../utils/colors';
import { 
  sendCharacterChatMessage, 
  sendRolePlayMessage, 
  sendStoryCreationMessage,
  simulateCharacterResponse,
  simulateRolePlayResponse,
  simulateStoryCreationResponse
} from '../utils/api';

interface Message {
  id: string;
  sender: 'user' | 'character';
  content: string;
  timestamp: Date;
  characterName?: string;
  avatar?: string;
}

const ChatPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = darkTheme;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
    characterName?: string;
  }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chatData = location.state;

  useEffect(() => {
    if (!chatData) {
      navigate('/home');
      return;
    }

    // Initialize conversation with a greeting
    const initMessages = getInitialMessages();
    setMessages(initMessages);
  }, [chatData, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getInitialMessages = (): Message[] => {
    const messages: Message[] = [];

    if (chatData.type === 'chat') {
      messages.push({
        id: '1',
        sender: 'character',
        content: `Hello! I'm ${chatData.characterName} from ${chatData.characterSource}. ${chatData.additionalInfo ? `You mentioned: ${chatData.additionalInfo}. ` : ''}I'm excited to chat with you! What would you like to talk about?`,
        timestamp: new Date(),
        characterName: chatData.characterName,
        avatar: getCharacterAvatar(chatData.characterName)
      });
    } else if (chatData.type === 'play') {
      messages.push({
        id: '1',
        sender: 'character',
        content: `*${chatData.aiCharacterName} appears in the scene*\n\n${chatData.sceneDescription}\n\nThe stage is set! What happens next?`,
        timestamp: new Date(),
        characterName: chatData.aiCharacterName,
        avatar: getCharacterAvatar(chatData.aiCharacterName)
      });
    } else if (chatData.type === 'create') {
      messages.push({
        id: '1',
        sender: 'character',
        content: `*The story begins*\n\n${chatData.storyScript}\n\n*The characters look around the scene*\n\nWhat's your move?`,
        timestamp: new Date(),
        characterName: 'Narrator',
        avatar: '📖'
      });

      // Add initial messages from each AI character
      chatData.aiCharacters?.forEach((character: any, index: number) => {
        messages.push({
          id: `init-${index + 2}`,
          sender: 'character',
          content: `*${character.name} from ${character.source} enters the scene* \n\nHello everyone! This is quite an interesting situation we find ourselves in.`,
          timestamp: new Date(Date.now() + (index + 1) * 1000),
          characterName: character.name,
          avatar: getCharacterAvatar(character.name)
        });
      });
    }

    return messages;
  };

  const getUserDisplayName = () => {
    if (chatData.type === 'play' || chatData.type === 'create') {
      return chatData.userCharacterName || user?.username || 'You';
    }
    return user?.username || 'You';
  };

  const getUserAvatar = () => {
    if (chatData.type === 'play' || chatData.type === 'create') {
      return getCharacterAvatar(chatData.userCharacterName || 'hero');
    }
    return user?.avatar || '👤';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date(),
      characterName: getUserDisplayName(),
      avatar: getUserAvatar()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Update conversation history
    const newHistoryEntry = {
      role: 'user' as const,
      content: inputMessage,
      characterName: getUserDisplayName()
    };
    const updatedHistory = [...conversationHistory, newHistoryEntry];
    setConversationHistory(updatedHistory);
    
    setInputMessage('');
    setIsTyping(true);

    try {
      let aiResponses: any[] = [];

      if (chatData.type === 'chat') {
        // Character Chat
        try {
          const response = await sendCharacterChatMessage({
            characterName: chatData.characterName,
            characterSource: chatData.characterSource,
            userMessage: inputMessage,
            mood: chatData.mood,
            additionalInfo: chatData.additionalInfo,
            conversationHistory: updatedHistory
          });
          
          aiResponses = [{
            message: response.message,
            characterName: response.characterName,
            timestamp: response.timestamp
          }];
        } catch (error) {
          console.warn('Edge function failed, using fallback:', error);
          const fallbackResponse = await simulateCharacterResponse({
            characterName: chatData.characterName,
            characterSource: chatData.characterSource,
            userMessage: inputMessage,
            mood: chatData.mood,
            additionalInfo: chatData.additionalInfo,
            conversationHistory: updatedHistory
          });
          
          aiResponses = [fallbackResponse];
        }
      } else if (chatData.type === 'play') {
        // Role Play
        try {
          const response = await sendRolePlayMessage({
            aiCharacterName: chatData.aiCharacterName,
            aiCharacterSource: chatData.aiCharacterSource,
            userCharacterName: chatData.userCharacterName,
            userCharacterSource: chatData.userCharacterSource,
            sceneDescription: chatData.sceneDescription,
            userMessage: inputMessage,
            mood: chatData.mood,
            conversationHistory: updatedHistory
          });
          
          aiResponses = [{
            message: response.message,
            characterName: response.characterName,
            timestamp: response.timestamp
          }];
          
          // Add scene update if provided
          if (response.sceneUpdate) {
            aiResponses.push({
              message: response.sceneUpdate,
              characterName: 'Narrator',
              timestamp: response.timestamp
            });
          }
        } catch (error) {
          console.warn('Edge function failed, using fallback:', error);
          const fallbackResponse = await simulateRolePlayResponse({
            aiCharacterName: chatData.aiCharacterName,
            aiCharacterSource: chatData.aiCharacterSource,
            userCharacterName: chatData.userCharacterName,
            userCharacterSource: chatData.userCharacterSource,
            sceneDescription: chatData.sceneDescription,
            userMessage: inputMessage,
            mood: chatData.mood,
            conversationHistory: updatedHistory
          });
          
          aiResponses = [fallbackResponse];
        }
      } else if (chatData.type === 'create') {
        // Story Creation
        try {
          const response = await sendStoryCreationMessage({
            userCharacterName: chatData.userCharacterName,
            userCharacterSource: chatData.userCharacterSource,
            aiCharacters: chatData.aiCharacters,
            storyScript: chatData.storyScript,
            userMessage: inputMessage,
            mood: chatData.mood,
            conversationHistory: updatedHistory
          });
          
          aiResponses = response.responses;
          
          // Add narrator update if provided
          if (response.narratorUpdate) {
            aiResponses.push({
              message: response.narratorUpdate,
              characterName: 'Narrator',
              timestamp: new Date().toISOString()
            });
          }
        } catch (error) {
          console.warn('Edge function failed, using fallback:', error);
          const fallbackResponse = await simulateStoryCreationResponse({
            userCharacterName: chatData.userCharacterName,
            userCharacterSource: chatData.userCharacterSource,
            aiCharacters: chatData.aiCharacters,
            storyScript: chatData.storyScript,
            userMessage: inputMessage,
            mood: chatData.mood,
            conversationHistory: updatedHistory
          });
          
          aiResponses = fallbackResponse.responses;
          if (fallbackResponse.narratorUpdate) {
            aiResponses.push({
              message: fallbackResponse.narratorUpdate,
              characterName: 'Narrator',
              timestamp: new Date().toISOString()
            });
          }
        }
      }

      // Add AI responses with delays for natural conversation flow
      aiResponses.forEach((response, index) => {
        setTimeout(() => {
          const aiMessage: Message = {
            id: `${Date.now()}-${index}`,
            sender: 'character',
            content: response.message,
            timestamp: new Date(response.timestamp),
            characterName: response.characterName,
            avatar: response.characterName === 'Narrator' ? '📖' : getCharacterAvatar(response.characterName)
          };
          
          setMessages(prev => [...prev, aiMessage]);
          
          // Update conversation history
          setConversationHistory(prev => [...prev, {
            role: 'assistant',
            content: response.message,
            characterName: response.characterName
          }]);
          
          if (index === aiResponses.length - 1) {
            setIsTyping(false);
          }
        }, index * 1000);
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsTyping(false);
      
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        sender: 'character',
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date(),
        characterName: 'System',
        avatar: '⚠️'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!chatData) {
    return null;
  }

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: theme.gradients.acrylic }}
    >
      <Header />
      
      {/* Enhanced Chat Header */}
      <div 
        className="backdrop-blur-xl border-b px-4 py-4 shadow-2xl relative z-10"
        style={{
          backgroundColor: theme.glass.background,
          borderColor: theme.border.accent
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="p-3 hover:bg-primary-500/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </motion.button>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-2xl"
                  style={{ 
                    background: theme.gradients.primary,
                    boxShadow: `0 0 20px ${theme.accent.primary}60`
                  }}
                >
                  {chatData.type === 'chat' ? getCharacterAvatar(chatData.characterName) : 
                   chatData.type === 'play' ? getCharacterAvatar(chatData.aiCharacterName) : '🎭'}
                </div>
                <div 
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
                  style={{ 
                    backgroundColor: theme.special.lime,
                    borderColor: theme.background.primary
                  }}
                ></div>
              </div>
              <div>
                <h2 className="font-bold text-white text-lg drop-shadow-lg">
                  {chatData.type === 'create' ? 'Multi-Character Story' : 
                   chatData.type === 'chat' ? chatData.characterName : chatData.aiCharacterName}
                </h2>
                <p 
                  className="text-sm font-medium"
                  style={{ color: theme.special.yellow }}
                >
                  {chatData.type === 'chat' && `from ${chatData.characterSource}`}
                  {chatData.type === 'play' && 'Role Playing Mode'}
                  {chatData.type === 'create' && `${chatData.aiCharacters?.length || 0} AI Characters`}
                </p>
              </div>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 hover:bg-primary-500/20 rounded-full transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Enhanced Messages Area */}
      <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-6 md:space-y-8 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-8`}
            >
              <div className={`flex items-start space-x-2 md:space-x-3 w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white text-sm md:text-lg flex-shrink-0 shadow-2xl"
                  style={{ 
                    background: theme.gradients.primary,
                    boxShadow: `0 0 15px ${theme.accent.primary}50`
                  }}
                >
                  {message.avatar}
                </motion.div>
                <div className={`relative w-full ${
                  message.sender === 'user' 
                    ? 'rounded-3xl rounded-br-lg shadow-2xl' 
                    : 'rounded-3xl rounded-bl-lg shadow-2xl'
                } p-4 md:p-5`}
                style={{
                  background: message.sender === 'user' 
                    ? theme.gradients.primary
                    : theme.glass.background,
                  border: message.sender === 'user' 
                    ? 'none'
                    : `2px solid ${theme.border.accent}`,
                  backdropFilter: message.sender === 'user' ? 'none' : 'blur(20px)',
                  boxShadow: message.sender === 'user'
                    ? `0 0 30px ${theme.accent.primary}40`
                    : `0 0 30px ${theme.accent.secondary}30`
                }}>
                  <div 
                    className="text-xs opacity-80 mb-2 font-medium"
                    style={{ color: message.sender === 'user' ? 'white' : theme.special.yellow }}
                  >
                    {message.characterName}
                  </div>
                  <div 
                    className="whitespace-pre-wrap leading-relaxed text-sm md:text-base font-medium text-white"
                  >
                    {message.content}
                  </div>
                  <div 
                    className="text-xs opacity-60 mt-2 text-right"
                    style={{ color: message.sender === 'user' ? 'white' : theme.text.muted }}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start mb-8"
            >
              <div className="flex items-start space-x-3">
                <div 
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white text-lg shadow-2xl"
                  style={{ 
                    background: theme.gradients.secondary,
                    boxShadow: `0 0 15px ${theme.accent.secondary}50`
                  }}
                >
                  🤖
                </div>
                <div 
                  className="rounded-3xl rounded-bl-lg p-4 shadow-2xl"
                  style={{
                    backgroundColor: theme.glass.background,
                    border: `2px solid ${theme.border.accent}`,
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <div className="flex space-x-2">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.special.lime }}
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.special.magenta }}
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.special.yellow }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Enhanced Message Input */}
      <div 
        className="backdrop-blur-xl border-t p-2 md:p-4 shadow-2xl relative z-10"
        style={{
          backgroundColor: theme.glass.background,
          borderColor: theme.border.accent
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end space-x-2 md:space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                rows={1}
                className="w-full p-3 md:p-4 pr-12 rounded-3xl focus:outline-none focus:ring-2 text-white resize-none shadow-inner text-sm md:text-base placeholder-gray-400"
                style={{ 
                  backgroundColor: theme.background.secondary,
                  border: `2px solid ${theme.border.primary}`,
                  focusRingColor: theme.accent.primary,
                  minHeight: '48px', 
                  maxHeight: '120px' 
                }}
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="p-3 md:p-4 text-white rounded-full hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
              style={{
                background: theme.gradients.primary,
                boxShadow: `0 0 30px ${theme.accent.primary}50`
              }}
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;