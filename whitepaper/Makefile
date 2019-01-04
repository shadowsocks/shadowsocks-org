all: ../assets/whitepaper.pdf

../assets/whitepaper.pdf: whitepaper.md
	pandoc -N --template=template.tex --variable fontsize=10pt --variable version=2.0 whitepaper.md --pdf-engine=xelatex -o ../assets/whitepaper.pdf

clean:
	rm -f ../assets/whitepaper.pdf
