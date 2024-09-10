interface MessageBubbleProps {
    isUser: boolean;
    content: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ isUser, content }) => {
    return (
        <div className={`mb-4 ${isUser ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                isUser ? 'bg-slate-900' : 'bg-slate-600'
            }`}>
                <p className="text-sm text-slate-50">{content}</p>
            </div>
        </div>
    );
};
