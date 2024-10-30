interface MessageBubbleProps {
    isUser: boolean;
    content: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ isUser, content }) => {
    return (
        <div className={`mb-4 mx-auto ${isUser ? 'text-right' : ''}`}>
            <div className={`inline-block p-3 rounded-lg ${
                isUser ? 'bg-slate-900' : 'bg-slate-600 w-full'
            }`}>
                <p className="text-sm text-slate-50">{content}</p>
            </div>
        </div>
    );
};
