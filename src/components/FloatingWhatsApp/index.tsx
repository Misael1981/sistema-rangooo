"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const ChatBubble = styled.div`
  background: white;
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  max-width: 280px;
  animation: ${slideUp} 0.3s ease-out;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 12px;
  color: #999;
`;

const ChatMessage = styled.p`
  font-size: 14px;
  margin: 0 0 12px 0;
`;

const ChatButton = styled.button`
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px;
  width: 100%;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

const WhatsAppButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s infinite;

  svg {
    font-size: 26px;
    color: white;
  }
`;

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber =
    process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "5535999110933";

  const handleClick = () => {
    const message =
      "Olá! Estou realizando o cadastro do meu estabelecimento no Rangooo e preciso de ajuda.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <FloatingContainer>
      {isOpen && (
        <ChatBubble>
          <CloseButton onClick={() => setIsOpen(false)}>
            <FaTimes />
          </CloseButton>
          <ChatMessage>
            Está com dúvida no cadastro? Posso te ajudar agora mesmo 🙂
          </ChatMessage>
          <ChatButton onClick={handleClick}>
            <FaWhatsapp /> Falar no WhatsApp
          </ChatButton>
        </ChatBubble>
      )}

      <WhatsAppButton onClick={() => setIsOpen(!isOpen)}>
        <FaWhatsapp />
      </WhatsAppButton>
    </FloatingContainer>
  );
};

export default FloatingWhatsApp;
